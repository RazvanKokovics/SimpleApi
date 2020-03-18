const router = require('express').Router();
const verifyToken = require('./verifyToken');
const { pool } = require('../config');

router.get('/expressions', verifyToken, (request, response) => {
    const queryString = "SELECT expressions.e_value FROM expressions INNER JOIN user_expressions ON expressions.e_id = user_expressions.e_id INNER JOIN users ON user_expressions.user_id = users.id WHERE users.user_name = $1";
    pool.query(queryString, [request.user.user_name])
    .then((result) => {
        response.status(200).json(result.rows);
    })
    .catch((error) => {
        throw error;
    });
})

router.post('/expressions', verifyToken, async (request, response) => {
    let resultExpressionId;
    try {
        resultExpressionId = await pool.query("INSERT INTO expressions (e_value) VALUES ($1) RETURNING e_id", [request.body.value]);
    } catch (error) {
        resultExpressionId = await pool.query("SELECT e_id FROM expressions WHERE e_value = $1", [request.body.value])
    }
    const expressionId = resultExpressionId.rows[0].e_id;
    const userId = request.user.user_id;
    try{
        const resultExistentExpression = await pool.query("SELECT * FROM user_expressions WHERE user_id = $1 AND e_id = $2", [userId, expressionId]);
        if(resultExistentExpression.rows.length === 0){
            await pool.query("INSERT INTO user_expressions (user_id, e_id) VALUES ($1, $2)", [userId, expressionId]);
            return response.status(201).send("Expression added.");
        }
        else{
            return response.status(400).send("Expression already exists.");
        }
    }catch(error){
        return response.status(400).send("An error occured.");
    }
})



module.exports = router;