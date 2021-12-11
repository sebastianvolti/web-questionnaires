function isUserAuthenticated(req, res, next) {
  try {
    if (req.user) {
    // disable for DL testing
    // if (req.user && req.user.role === 'user') {
      next();
    } else {
      res.status(401).send({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (err) {
    res.status(401).send({
      success: false,
      message: "Unauthorized",
    });
  }
}

export default isUserAuthenticated;
