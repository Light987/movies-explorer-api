const { login, createUser, logout } = require('../controllers/users');
const { loginJoi, createUserJoi } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const movieRoutes = require('./movies');
const userRoutes = require('./users');
// eslint-disable-next-line import/order
const router = require('express').Router();

router.post('/signin', loginJoi, login);
router.post('/signup', createUserJoi, createUser);
router.post('/', logout);

router.use(auth);
router.use(userRoutes);
router.use(movieRoutes);

module.exports = router;
