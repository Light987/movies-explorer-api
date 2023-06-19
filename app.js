require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { loginJoi, createUserJoi } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const movieRoutes = require('./routes/movies');
const userRoutes = require('./routes/users');
const NotFound = require('./errors/NotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorCenter = require('./middlewares/errorCenter');

const { DB_URL, PORT } = process.env;
const app = express();

// eslint-disable-next-line no-console
mongoose.connect(DB_URL).then(() => console.log('Connected to DB'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://my-movies-explorer.nomoredomains.rocks',
    'https://my-movies-explorer.nomoredomains.rocks',
    'http://api.my-movies-explorer.nomoredomains.rocks',
    'https://api.my-movies-explorer.nomoredomains.rocks',
  ],
  credentials: true,
}));

app.use(requestLogger);

app.post('/signin', loginJoi, login);
app.post('/signup', createUserJoi, createUser);

app.use(auth);
app.use(userRoutes);
app.use(movieRoutes);

app.use((req, res, next) => {
  next(new NotFound('Страница отсутствует.'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorCenter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
