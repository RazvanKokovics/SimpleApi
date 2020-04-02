const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authRoute = require('./routes/authentification');
const secretExpressions = require('./routes/viewUserData');

app.use('/user', authRoute);
app.use('/api', secretExpressions);

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log('Server listening');
});
