const router = require('express').Router();
const {
  addUserValidationRules,
  loginValidationRules,
  validateData,
} = require('../validate.js');
const { pool } = require('../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const addUser = (request, response) => {
  const { user_name, e_mail, first_name, last_name, password } = request.body;
  pool
    .query('SELECT * FROM users WHERE user_name=$1', [user_name])
    .then((result) => {
      if (result.rows.length === 0) {
        // hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        pool.query(
          'INSERT INTO users (user_name, e_mail, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5)',
          [user_name, e_mail, first_name, last_name, hashPassword],
          (error) => {
            if (error) {
              throw error;
            }
            response.status(201).json({
              status: 'Success',
              message: 'User added.',
            });
          },
        );
      } else {
        response.status(400).send('Username already exists!');
      }
    })
    .catch((error) => {
      throw error;
    });
};

const getUsers = (request, response) => {
  pool
    .query('SELECT * FROM users')
    .then((result) => {
      response.status(200).json(result.rows);
    })
    .catch((error) => {
      throw error;
    });
};

const login = (request, response) => {
  const { user_name, password } = request.body;

  pool
    .query('SELECT * FROM users WHERE user_name=$1', [user_name])
    .then(async (result) => {
      if (result.rows.length === 0) {
        // invalid username
        response.status(401).send('Invalid username!');
      } else {
        const user = result.rows[0];

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) response.status(401).send('Invalid password!');

        //create an assign a token
        const token = jwt.sign(
          { user_name: user.user_name, user_id: user.id },
          process.env.TOKEN_SECRET,
        );
        response.header('auth-token', token).send(token);
      }
    })
    .catch((error) => {
      throw error;
    });
};

router.post('/register', addUserValidationRules(), validateData, addUser);
router.get('/', getUsers);
router.post('/login', loginValidationRules(), validateData, login);

module.exports = router;
