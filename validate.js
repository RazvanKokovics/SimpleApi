const { body, validationResult } = require('express-validator');

const addUserValidationRules = () => {
  return [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('firstName').isLength({ min: 3 }),
    body('lastName').isLength({ min: 3 }),
    body('userName').isLength({ min: 5 }),
  ];
};

const validateData = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors
    .array()
    .map((error) => extractedErrors.push({ [error.param]: error.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

const loginValidationRules = () => {
  return [
    body('user_name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
  ];
};

module.exports = {
  addUserValidationRules,
  loginValidationRules,
  validateData,
};
