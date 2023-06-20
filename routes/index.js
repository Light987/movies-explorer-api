const signinRoute = require('./signin');
const signoutRoute = require('./signout');
const signupRoute = require('./signup');
const auth = require('../middlewares/auth');
const movieRoutes = require('./movies');
const userRoutes = require('./users');
const router = require('express').Router();

router.use(signupRoute);
router.use(signinRoute);
router.use(signoutRoute);
router.use(auth);
router.use(userRoutes);
router.use(movieRoutes);

module.exports = router;
