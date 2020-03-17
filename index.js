const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/*




const getUsersNumber = (request, response) => {
	pool.query(`SELECT COUNT(*) FROM users`, (error, results) => {
		if(error){
			throw error;
		}
		response.status(200).json(results.rows);
	}
	)
}

app.route(`/users`)
  	// GET endpoint
	.get(getUsers)
  	// POST endpoint
	.post(userValidationRules(), validateData, addUser)

app.route(`/users/number`)
	.get(getUsersNumber)

*/

const authRoute = require('./routes/authentification');
const secretPost = require('./routes/viewUserData');

app.use('/user', authRoute);
app.use('/api', secretPost);

// Start server
app.listen(process.env.PORT || 3002, () => {
  	console.log(`Server listening`);
})