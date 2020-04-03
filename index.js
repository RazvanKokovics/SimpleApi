require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

import usersRoute from './routes/users';
import expressionsRoute from './routes/expressions';
import authRoute from './routes/login';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/user', usersRoute);
app.use('/expressions', expressionsRoute);
app.use('/user', authRoute);

const PORT = process.env.PORT || 3002;
// Start server
app.listen(PORT, console.log('Server listening'));
