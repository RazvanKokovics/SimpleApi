const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./config');
const { userValidationRules, validate } = require('./validate.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const getUsers = (request, response) => {
	pool.query(`SELECT * FROM users`, (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
  	})
}

const addUser = (request, response) => {
	const { id, user_name, e_mail, first_name, last_name, password } = request.body;
	
	pool.query('INSERT INTO users (id, user_name, e_mail, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5, $6)', 
	[id, user_name, e_mail, first_name, last_name, password], error => {
      	if (error) {
        	throw error
      	}
      	response.status(201).json({ status: 'success', message: 'User added.' })
    })
}

app
  	.route(`/users`)
  	// GET endpoint
  	.get(getUsers)
  	// POST endpoint
  	.post(userValidationRules(), validate, addUser)

// Start server
app.listen(process.env.PORT || 3002, () => {
  	console.log(`Server listening`)
})