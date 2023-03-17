const port = 3000
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var router1  = require('./routers/AccountRouter');
const path = require('path')

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use('/public',express.static(path.join(__dirname,'./public')))
// middelware 
// var checkLogin = (req,res, next) => {
//     if(true){
//         next()
//     }else{
//         res.json('login false')
//         next("Data")// step bug
//     }
// }

app.get('/home',(req,res,next)=>{
    var pathFileHome = path.join(__dirname,'./index.html')
    console.log(pathFileHome)
    res.sendFile(pathFileHome)
})
app.get('/login',(req,res,next)=>{
    var pathFileHome = path.join(__dirname,'./viewer/Login.html')
    res.sendFile(pathFileHome)
})


// app.use('/admin/api/v1/', router1);
app.use('/api/', router1);

// app.use((err,req,res,next) => {
//     // log bug 
// })
// process.env.PORT
app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
});

