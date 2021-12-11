export const validateCreationStatus = (req, res, next) => {
  const status = req.body.status;

  if (status === 'draft' || status === 'published') {
    next();
  } else {
    res.status(400).send({
      success: false,
      message: 'Survey status error. Status must be draft or published',
    });
  }
};
