const movieSchema = require('../models/movie');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

require('dotenv').config();

module.exports.getMovies = (req, res, next) => {
  movieSchema.find({})
    .then((movies) => res.send(movies.reverse()))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;

  movieSchema.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId: req.body.movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы неверные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  movieSchema.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Фильм с таким id не найдена.');
      }
      if (req.user._id.toString() !== movie.owner.toString()) {
        throw new Forbidden('Нельзя удалить фильм другого пользователя!');
      }

      return movie.deleteOne()
        .then(() => res.status(200).send({ message: 'Фильм удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы неверные данные.'));
      } else {
        next(err);
      }
    });
};
