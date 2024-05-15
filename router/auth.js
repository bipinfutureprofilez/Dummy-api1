const express = require('express')
const router = express.Router()

const {
    signUp,
    signIn,
    logout
} = require('../controllers/auth')

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/logout').post(logout);

module.exports = router;
