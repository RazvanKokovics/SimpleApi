require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import mainRouter from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', mainRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, console.log('Server listening'));

export default app;
