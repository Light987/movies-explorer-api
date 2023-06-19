const router = require('express').Router();

const { createUser } = require('../controllers/users');

const { createUserJoi } = require('../middlewares/validation');

router.post('/signup', createUserJoi, createUser);

module.exports = router;
