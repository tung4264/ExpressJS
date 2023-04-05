const port = 3000
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
const AccountModel = require('./MongoConnection/AccountConnection');
var router1  = require('./routers/AccountRouter');
const path = require('path')
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
const https = require('https');
const fs = require('fs');
const options = {
    key: fs.readFileSync('./Key/key.pem'),
    cert: fs.readFileSync('./Key/cert.pem')
};

app.use(cookieParser());
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use('/public',express.static(path.join(__dirname,'./public')))
app.use(express.static(path.join(__dirname,'./routers')))
app.use('/api/', router1);
///
// app.post('/login',function(req,res,Next){
//     alert("Post");
// });


///
app.get('/',(req,res,next)=>{
    var pathFileHome = path.join(__dirname,'./index.html')
    res.sendFile(pathFileHome)
})
app.get('/home',(req,res,next)=>{
    var pathFileHome = path.join(__dirname,'./home.html')
    res.sendFile(pathFileHome)
})


var checkLogin=(req,res,next)=>{
    //check login
    try{
        var token =  req.cookies.token;
        var user = jwt.verify(token,'thnk');
        AccountModel.findOne({
            _id: user._id
        })
        .then(data=>{
            if(data){
                req.data = data;
                next()
            }else{
                res.json("NOT Permisson")
            }
        })
        .catch(err=>{

        })
    }catch(err){
        res.status(500).json({"Server error:": err});
    }
}

var checkStudent = (req,res,next)=>{
    var role = req.data.role;
    if(role <= 2){
        next();
    }else{
        res.json("Not Permisson");
    }
}
var checkTeacher = (req,res,next)=>{
    var role = req.data.role;
    if(role <= 1){
        next();
    }else{
        res.json("Not Permisson");
    }
}
var checkManager = (req,res,next)=>{
    var role = req.data.role;
    if(role <= 0){
        next();
    }else{
        res.json("Not Permisson");
    }
}

app.get('/task',checkLogin,checkStudent,(req,res,next)=>{
    res.json('all task')
})

app.get('/student',checkLogin,checkTeacher,(req,res,next)=>{
    
    next()
},(req,res,next)=>{
    res.json('student')
})

app.get('/teacher',checkLogin,checkManager,(req,res,next)=>{
    
    next()
},(req,res,next)=>{
    res.json('task')
})

// app.post('/login',function(req,res,next){
//     var _username  = req.body.username;
//     var _password  = req.body.password;

//     res.send("Post result "+ _username+" "+_password);
// })

// app.use('/admin/api/v1/', router1);

https.createServer(options, app).listen(process.env.PORT || port, (resq) =>{
        console.log(`Example app listening at https://localhost:${port}`);
    });

// app.listen(process.env.PORT || port, (resq) =>{
//     console.log(`Example app listening at http://localhost:${port}`);
// });

// app.listen(process.env.PORT, () =>{
    
// });

