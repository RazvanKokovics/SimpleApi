const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        body('e_mail').isEmail(),
        body('password').isLength({ min: 5 }),
    ];
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors = []

    errors.array().map(error => extractedErrors.push({ [error.param] : err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    });
}

module.exports = {
    userValidationRules,
    validate,
}