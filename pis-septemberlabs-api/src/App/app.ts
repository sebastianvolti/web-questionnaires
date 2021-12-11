import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as GoogleStrategy from 'passport-google-oauth';
import apiV1 from '../apiV1';
import config from '../config/config';
import * as errorHandler from '../helpers/errorHandler';
import router from '../helpers/unknownRoutes';
import { User } from '../db/models/user.model';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
    this.setPassport();
  }

  private setMiddlewares(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(
      session({
        secret: config.COOKIE_SESSION_KEY,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24,
        },
        resave: true,
        saveUninitialized: true,
      })
    );
    this.express.use(passport.initialize());
    this.express.use(passport.session());
    this.express.options('*', cors(this.corsOptionsHandler));
    this.express.use(cors(this.corsOptionsHandler));
    this.express.use(
      morgan((tokens, req, res) => {
        return [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'),
          '-',
          tokens['response-time'](req, res),
          'ms',
        ].join(' ');
      })
    );
    this.express.use(helmet());
  }

  private setRoutes(): void {
    this.express.use('/v1', apiV1);
    this.express.use('', router);
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
  }

  private corsOptionsHandler = (
    req: express.Request,
    callback: (err: Error | null, options?: cors.CorsOptions) => void
  ) => {
    const WHITELIST_URLS = [config.APP, config.ADMIN];
    const corsOptions: cors.CorsOptions = {
      origin(
        origin: string,
        call: (err: Error | null, allow?: boolean) => void
      ) {
        if (WHITELIST_URLS.includes(origin) || !origin) {
          call(null, true);
        } else {
          call(new Error('Not allowed'), false);
        }
      },
      credentials: true,
      allowedHeaders: [
        'Save-Data',
        'Content-Type',
        'Authorization',
        'Content-Length',
        'X-Requested-With',
        'Accept',
      ],
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };
    callback(null, corsOptions);
  };

  private setPassport(): void {
    passport.serializeUser(function (user: User, done) {
      done(null, user.id);
    });

    passport.deserializeUser(async function (id: string, done) {
      const user = await User.findByPk(id);

      if (!user) {
        done('invalid user', null);
      }

      done(null, { id, role: user.role });
    });

    passport.use(
      'user',
      new GoogleStrategy.OAuth2Strategy(
        {
          clientID: config.GOOGLE_CLIENT_ID,
          clientSecret: config.GOOGLE_CLIENT_SECRET,
          callbackURL: config.GOOGLE_CALLBACK_URL,
        },
        async function (accessToken, refreshToken, profile, done) {
          try {
            let user = await User.findOne({
              where: { id: profile.id },
            });

            if (!user) {
              user = new User({
                id: profile.id,
                name: profile._json.given_name,
                lastName: profile._json.family_name,
                email: profile._json.email,
                role: 'user',
              });

              const newUser = await user.save();
            }
            done(null, user);
          } catch (err) {
            done(err, false);
          }
        }
      )
    );

    passport.use(
      'admin',
      new GoogleStrategy.OAuth2Strategy(
        {
          clientID: config.GOOGLE_CLIENT_ID,
          clientSecret: config.GOOGLE_CLIENT_SECRET,
          callbackURL: config.GOOGLE_ADMIN_CALLBACK_URL,
        },
        async function (accessToken, refreshToken, profile, done) {
          try {
            let user = await User.findOne({
              where: { id: profile.id },
            });

            if (!user) {
              user = new User({
                id: profile.id,
                name: profile._json.given_name,
                lastName: profile._json.family_name,
                email: profile._json.email,
                role: 'admin',
              });

              const newUser = await user.save();
            }

            if (user.role !== 'admin') {
              user.role = 'admin';

              const newUser = await user.save();
            }

            done(null, user);
          } catch (err) {
            done(err, false);
          }
        }
      )
    );
  }
}

export default new App().express;
