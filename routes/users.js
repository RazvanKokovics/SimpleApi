const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { addUserValidationRules, validateData } = require('../validate.js');
const { User } = require('../models');

const getUsers = (request, response) => {
  User.findAll()
    .then((users) => response.status(200).send(users))
    .catch((error) => console.log(error));
};

const addUser = (request, response) => {
  const { userName, email, firstName, lastName, password } = request.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  User.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
    userName,
  })
    .then(() =>
      response.status(201).json({
        status: 'Success',
        message: 'User added.',
      }),
    )
    .catch((error) => console.log(error));
};

const deleteUser = (request, response) => {
  const { userName } = request.body;

  User.destroy({
    where: {
      userName,
    },
  })
    .then(() =>
      response.status(201).json({
        status: 'Success',
        message: 'User removed.',
      }),
    )
    .catch((error) => console.log(error));
};

const updateUser = (request, response) => {
  const { userName, email, firstName, lastName } = request.body;

  User.update(
    { email, firstName, lastName },
    {
      where: {
        userName,
      },
    },
  )
    .then(() =>
      response.status(201).json({
        status: 'Success',
        message: 'User data updated.',
      }),
    )
    .catch((error) => console.log(error));
};

router.get('/', getUsers);
router.post('/register', addUserValidationRules(), validateData, addUser);
router.delete('/delete', deleteUser);
router.put('/update', updateUser);

module.exports = router;
