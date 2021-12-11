import config from '../config/config';

export const authenticateUser = (req, res, next) => {
  const origin = req.headers.origin;
  let error = false;

  if (!req.user) {
    error = true;
  } else {
    if (origin === config.APP) {
      // Req sent from webapp
      // disable for DL testing
      // if (req.user.role !== 'user') {
      //   error = true;
      // }
    } else if (origin === config.ADMIN) {
      // Req sent from admin
      // disable for DL testing
      // if (req.user.role !== 'admin') {
      //   error = true;
      // }
    } else {
      error = true;
    };
  }

  if (error) {
    res.status(401).send('Unauthorized');
  } else {
    next();
  }
}