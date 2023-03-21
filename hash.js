var jwt = require('jsonwebtoken');
var data = {username: 'nttung4',Password:'123456'}
var token = jwt.sign(data, 'shhhhh');
console.log(token);