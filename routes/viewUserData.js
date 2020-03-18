const router = require('express').Router();
const verify = require('./verifyToken');
const { pool } = require('../config');

router.get('/', verify, (request, response) => {
    const queryString = "SELECT expressions.e_value FROM expressions INNER JOIN user_expressions ON expressions.e_id = user_expressions.e_id INNER JOIN users ON user_expressions.user_id = users.id WHERE users.user_name = $1"
    pool.query(queryString, [request.user.user_name])
    .then((result) => {
        response.status(200).json(result.rows);
    })
    .catch((error) => {
        throw error;
    });
})

module.exports = router;