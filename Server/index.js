require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./routes/index');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    credentials: true,
    origin: `${process.env.CLIENT_URL}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.BD_URL);
    app.listen(PORT, () => {
      console.log('Start success', PORT);
      console.log('process.env.PORT', process.env.PORT);
    });
  } catch (error) {
    console.log('error', error);
  }
};

start();
