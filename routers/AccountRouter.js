var express = require('express');
var router = express.Router();
// const { exists } = require('../modules/account');
const AccountModel = require('../modules/account');
const PAGE_SIZE = 2

router.get('/account',(req,res,next) => {
    var page = req.query.page;
    if(page){
        //get page
        page = parseInt(page)
        if(page<1){
            page =1
        }
        var skipNumber = (page -1) * PAGE_SIZE
        
        AccountModel.find({})
        .skip(skipNumber)
        .limit(PAGE_SIZE)
        .then(data=>{
            AccountModel.countDocuments({}).then((total)=>{
                var totalPage = Math.ceil(total/PAGE_SIZE)
                res.json({
                    total: total,
                    totalPage: totalPage,
                    data: data
                });
            })
            
        })
        .catch(err=>{
            res.status(500).json('Server Error!')
        })
    }else{
        //get all
        AccountModel.find({})
        .then(data=>{        
            res.json(data)
        })
        .catch(err=>{
            res.status(500).json('Server Error!')
        })
    }
})

router.get('/account/:id',(req,res,next) => {
    var id = req.params.id
    AccountModel.findById({_id: id})
    .then(data=>{
        if(data){
            res.json(data)
        }else{
            res.status(400).json('Can not find id '+id)
        }
    })
    .catch(err=>{
        res.status(500).json('Server Error!')
    })
})
//add new account
router.post('/register',(req,res,next) => {
    var _username = req.body.username;
    var _password = req.body.Password;
    var _firstname = req.body.firstname;
    var _lastname = req.body.lastname;
    var _email = req.body.email;
    var _phonenumber = req.body.phonenumber;
    var _role  = req.body.role;
    var _position = req.body.position;
    
    // check exists username
    AccountModel.findOne({
        username: _username
    })
    .then(data => {
        if(data){
            res.json('Exists username')
        }else{
            return  AccountModel.create({
                username: _username,
                Password: _password,
                firstname: _firstname,
                lastname: _lastname,
                email: _email,
                phonenumber: _phonenumber,
                role: _role,
                position: _position 
            })
            .then(data => {
                res.json('Success register')
            })
            .catch(err=>{
                res.status(500).json('False register')
            })
        }
    })


    // res.json('router 1 register Post ')
})

router.post('/login',(req,res,next) =>{
    var _username = req.body.username
    var _password = req.body.password
    // console.log(_username,_password)
    AccountModel.findOne({
        username: _username,
        password: _password 
    })
    .then(data =>{
        // console.log(data)
        if(data){
            res.json('Login Sucess')
        }else{
            res.status(400).json('Username or password not correct')
        }
    })
    .catch(err=>{
        res.status(500).json('Login false server error')
    })
})
//Update data
router.put('/account/:id',(req,res,next) => {
    var _id = req.params.id
    var newPassword = req.body.newPassword

    AccountModel.findByIdAndUpdate(_id,{
        Password: newPassword
    })
    .then(data =>{
        res.json('update true')
    })
    .catch(err=>{
        res.status(500).json('Server error')
    })
})

router.delete('/account/:id',(req,res,next) => {
    var id = req.params.id
    AccountModel.deleteOne({
        _id: id
    })
    .then(data=>{
        res.json('delete true')
    })
    .catch(err=>{
        res.status(500).json('server error')
    }) 
})

module.exports = router
