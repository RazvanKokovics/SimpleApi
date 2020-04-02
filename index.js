const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//const authRoute = require('./routes/authentification');
//const secretExpressions = require('./routes/viewUserData');
const usersRoute = require('./routes/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/user', usersRoute);
//app.use('/api', secretExpressions);

const PORT = process.env.PORT || 3002;
// Start server
app.listen(PORT, console.log('Server listening'));
