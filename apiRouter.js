var express = require('express');
const AccountModel = require('./modules/account');
var router = express.Router();

router.get('/',(req,res) => {
    console.log(req.body);
    res.json('router 1 user GEt')
})

router.post('/register',(req,res) => {
    var _username = req.body.username;
    var _password = req.body.Password;
    var _firstname = req.body.firstname;
    var _lastname = req.body.lastname;
    var _email = req.body.email;
    var _phonenumber = req.body.phonenumber;
    var _role  = req.body.role;
    var _position = req.body.position;
    // console.log(username, password);
    AccountModel.create({
        username: _username,
        Password: _password,
        firstname: _firstname,
        lastname: _lastname,
        email: _email,
        phonenumber: _phonenumber,
        role: _role,
        position: _position 
    })
    .then(data=>{
        res.json('Success register')
    })
    .catch(err=>{
        res.status(500).json('False register')
    })
    // res.json('router 1 register Post ')
})

// router.put('/',(req,res) => {
//     res.json('router 1 PUT')
// })

// router.delete('/',(req,res) => {
//     res.json('router 1 Delete')
// })

module.exports = router
