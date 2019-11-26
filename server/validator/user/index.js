const { check, validationResult } = require('express-validator');

module.exports = async (req, res, next) => {
    try {
        await check('firstName')
            .not()
            .isEmpty()
            .withMessage("Name is required")
            .isLength({
                min: 2,
                max: 20,
            })
            .withMessage("First name must be minimum two character long").run(req);
        await check("lastName")
            .not()
            .isEmpty()
            .withMessage("Name is required")
            .isLength({
                min: 2,
                max: 20,
            })
            .withMessage("Last name must be minimum two character long").run(req);
        await check("email")
            .not()
            .isEmpty()
            .withMessage("Email is required")
            .isEmail().withMessage("Thats not an email").run(req);
        await check('password')
            .not()
            .isEmpty()
            .withMessage("Password is required")
            .isLength({ min: 6 })
            .withMessage("Password must be minimum six character long")
            .matches(/\d/)
            .withMessage("Password must contain at least a number").run(req);
        
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(403).json({
                msg: errors.array()[0].msg,
            });
        }
        next();
    } catch(err) {
        res.status(403).json(err);
    }
}