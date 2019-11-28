const router = require('express').Router();
const auth = require('../middleware/auth');
const profileController = require('../../controllers/user-controller/profile.controller');

router.post('/', auth, profileController);

module.exports = router;