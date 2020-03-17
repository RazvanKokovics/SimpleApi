const router = require('express').Router();
const { addUserValidationRules, loginValidationRules, validateData } = require('../validate.js');
const { pool } = require('../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function emailNotExists(email){
    pool.query("SELECT * FROM users WHERE e_mail=$1", [email], (error, result) => {
		if (error) {
			throw error;
        }
        console.log(result.rows.length);
        if (result.rows.length === 0){
            return true;
        }
        return false;
  	});
}

function userNameNotExists(username){
    return pool.query("SELECT * FROM users WHERE user_name=$1", [username], (error, result) => {
		if (error) {
			throw error;
        }
        if (result.rows.length === 0){
            return true;
        }
        return false;
  	});
}

const addUser = (request, response) => {
	const { id, user_name, e_mail, first_name, last_name, password } = request.body;

    // hash the password
    const salt = bcrypt.genSalt(10);
    const hashPassword = bcrypt.hash(password, salt);

	pool.query('INSERT INTO users (user_name, e_mail, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5)', 
	[user_name, e_mail, first_name, last_name, hashPassword], error => {
      	if (error) {
        	throw error;
      	}
      	response.status(201).json(
			{ 
				status: 'Success', 
				message: 'User added.' 
            }
		);
    })
}

const getUsers = (request, response) => {
	pool.query(`SELECT * FROM users`, (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
  	})
}

const login = async (request, response) => {
    const {user_name, password } = request.body;
    pool.query("SELECT * FROM users WHERE user_name=$1", [user_name],async (error, result) => {
        if (error) {               
            throw error;
        }
        let user = result.rows[0];
        if(!result.rows || result.rows.length <= 0)
            response.status(400).send('Invalid username');
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) 
            response.status(400).send('Invalid password!');
        
        //create an assign a token
        const token = jwt.sign({user_name: user.user_name}, process.env.TOKEN_SECRET);
        response.header('auth-token', token).send(token);
    })
}

router.post('/register', addUserValidationRules(), validateData, addUser);
router.get('/', getUsers);
router.post('/login', loginValidationRules(), validateData, login);

module.exports = router;