const router = require('express').Router();
const auth = require('../middleware/auth');


router.post('/', auth, (req, res) => {
    res.status(200).send({
        msg: "You are authorized"
    });
});

module.exports = router;