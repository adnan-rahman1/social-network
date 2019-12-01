const router = require('express').Router();
const auth = require('../middleware/auth');
const profileController = require('../../controllers/user-controller/profile.controller');

router.get('/', auth, profileController);

module.exports = router;