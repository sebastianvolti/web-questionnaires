import { Router } from 'express';
import * as controller from './auth.controller';

import * as passport from 'passport';
import { authenticateUser } from '../../helpers/authorization';
import config from '../../config/config';

const auth: Router = Router();

auth.get(
  '/authenticate/google',
  passport.authenticate('user', {
    scope: ['profile', 'email'],
  })
);

auth.get(
  '/authenticate/admin/google',
  passport.authenticate('admin', {
    scope: ['profile', 'email'],
  })
);

auth.get('/authenticate/user', authenticateUser, controller.getUser);

auth.get(
  '/authenticate/google/callback',
  passport.authenticate('user', {
    failureRedirect: config.APP + '/callback?status=failure',
    failureFlash: true,
    successRedirect: config.APP + '/callback?status=success',
  })
);

auth.get(
  '/authenticate/admin/google/callback',
  passport.authenticate('admin', {
    failureRedirect: config.ADMIN + '/callback?status=failure',
    failureFlash: true,
    successRedirect: config.ADMIN + '/callback?status=success',
  })
);

auth.get('/authenticate/logout', controller.logout);

export default auth;
