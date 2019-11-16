const { check, validationResult } = require('express-validator');

module.exports = {
    validationRule: [
        check("title")
            .not()
            .isEmpty()
            .withMessage("Title is required")
            .isLength({
                min: 4,
                max: 150,
            })
            .withMessage("Title must be between 4 to 150 character long"),
        check("body")
            .not()
            .isEmpty()
            .withMessage("Body is required")
            .isLength({
                min: 4,
                max: 1500,
            })
            .withMessage("Body must be between 4 to 2000 character long"),
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