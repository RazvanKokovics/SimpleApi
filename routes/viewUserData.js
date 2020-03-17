const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (request, response) => {
    response.send(request.user);
    User.findByOne({user_name:request.user});
})

module.exports = router;