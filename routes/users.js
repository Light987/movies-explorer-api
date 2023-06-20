const router = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

const { updateUserJoi } = require('../middlewares/validation');

router.get('/users/me', getUser);
router.patch('/users/me', updateUserJoi, updateUser);

module.exports = router;
