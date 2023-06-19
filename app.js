require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const NotFound = require('./errors/NotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorCenter = require('./middlewares/errorCenter');
const router = require('./routes');

const { DB_URL, PORT } = process.env;
const app = express();

// eslint-disable-next-line no-console
mongoose.connect(DB_URL).then(() => console.log('Connected to DB'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(rateLimit);
app.use(helmet());

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

app.use('/', router);

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
