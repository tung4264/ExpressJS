const port = 3000
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var router1  = require('./routers/AccountRouter');
// const AccountModel = require('./modules/account')

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

// middelware 
// var checkLogin = (req,res, next) => {
//     if(true){
//         next()
//     }else{
//         res.json('login false')
//         next("Data")// step bug
//     }
// }

app.get('/',(req,res,next)=>{
    res.json('home')
})
// app.use('/admin/api/v1/', router1);
app.use('/api/v1/', router1);

// app.use((err,req,res,next) => {
//     // log bug 
// })
app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
});

// commint anh push 2