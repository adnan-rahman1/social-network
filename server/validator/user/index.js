const { check, validationResult } = require('express-validator');

module.exports = {
    validationRule: [
        check("firstName")
            .not()
            .isEmpty()
            .withMessage("First name is required")
            .isLength({
                min: 2,
                max: 20,
            })
            .withMessage("First name must be minimum two character long"),
        check("lastName")
            .not()
            .isEmpty()
            .withMessage("Last name is required")
            .isLength({
                min: 2,
                max: 20,
            })
            .withMessage("Last name must be minimum two character long"),
        check("email")
            .not()
            .isEmpty()
            .isEmail()
            .withMessage("Email is required"),
        check('password')
            .not()
            .isEmpty()
            .withMessage("Password is required")
            .isLength({ min: 6 })
            .withMessage("Password must be minimum six character long")
            .matches(/\d/)
            .withMessage("Password must contain at least a number")
    ],
    validateResult: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0].msg,
            });
        }
        next();
    }
}