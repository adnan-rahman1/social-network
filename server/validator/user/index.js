const { check, validationResult } = require('express-validator');

module.exports = async (req, res, next) => {
    try {
        if (req.body.name === "") {
            await check('name')
                .not()
                .isEmpty()
                .withMessage("Name is required")
                .isLength({
                    min: 3,
                    max: 20,
                })
                .withMessage("Name must be minimum two character long").run(req);
        }
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