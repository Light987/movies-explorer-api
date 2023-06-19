const router = require('express').Router();

const { login } = require('../controllers/users');

const { loginJoi } = require('../middlewares/validation');

router.post('/signin', loginJoi, login);

module.exports = router;
