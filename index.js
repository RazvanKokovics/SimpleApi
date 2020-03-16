const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const getUsers = (request, response) => {
  pool.query(`SELECT * FROM users`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addUser = (request, response) => {
  const { user_name, e_mail, first_name, last_name, password } = request.body
  pool.query('INSERT INTO users (user_name, e_mail, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5)', [user_name, e_mail, first_name, last_name, password], error => {
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
  .post(addUser)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})