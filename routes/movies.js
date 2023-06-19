const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { movieIdJoi, createMovieJoi } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', createMovieJoi, createMovie);
router.delete('/movies/:_id', movieIdJoi, deleteMovie);

module.exports = router;
