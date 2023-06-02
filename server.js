const port = 3000
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
const AccountModel = require('./MongoConnection/AccountConnection');
var router1  = require('./routers/AccountRouter');
var routerChat = require('./routers/chatGPT');
const path = require('path')
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
const MongoStore = require('connect-mongo');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false 
    // ,maxAge
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://admin:IvFcqCTo8kWtqRDs@cluster0-shard-00-00.flml8.mongodb.net:27017,cluster0-shard-00-01.flml8.mongodb.net:27017,cluster0-shard-00-02.flml8.mongodb.net:27017/?ssl=true&replicaSet=atlas-jttv87-shard-0&authSource=admin&retryWrites=true&w=majority',
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native'
    })
}))

// const https = require('https');
// const fs = require('fs');
// const options = {
//     key: fs.readFileSync('./Key/key.pem'),
//     cert: fs.readFileSync('./Key/cert.pem')
// };

app.use(cookieParser());
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use('/public',express.static(path.join(__dirname,'./public')))
app.use(express.static(path.join(__dirname,'./routers')))
app.use('/api/', router1);
app.use('/chat/',routerChat);
///

///
app.get('/',(req,res,next)=>{
    // var pathFileHome = path.join(__dirname,'./login.html')
    var pathFileHome = path.join(__dirname,'./index.html')
    res.sendFile(pathFileHome)
})
app.get('/home',(req,res,next)=>{
    var pathFileHome = path.join(__dirname,'./home.html')
    res.sendFile(pathFileHome)
})
app.get('/chat',(req,res,next)=>{
    var pathChat = path.join(__dirname,'./viewer/chatbox.html')
    res.sendFile(pathChat)
})
app.get('/index',(req,res,next)=>{
    var pathChat = path.join(__dirname,'./viewer/index.html')
    res.sendFile(pathChat)
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
//save sesion to mongocloud
app.get('/demo', function(req, res, next) {
    // req.session.user = {
    //     uuid: '12234-2345-2323423'
    // }
    req.session.save(err => {
        if(err){
            console.log(err);
            res.json("err "+err)
        } else {
            // console.log(req.session);
            res.send(req.session.user)
        }
    });
    // if (req.session.views) {
    //   req.session.views++
    //   res.setHeader('Content-Type', 'text/html')
    //   res.write('<p>views: ' + req.session.views + '</p>')
    //   res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    //   res.end()
    // } else {
    //   req.session.views = 1
    //   res.end('welcome to the session demo. refresh!')
    // }
  });
// Delete session 
app.get('/logout',function(req,res,next){
    req.session.destroy(err => {
        if(err){
            console.log(err);
        } else {
            res.send('Session is destroyed')
        }
    });
})

// app.use('/api/chat/', routerChat);

// https.createServer(options, app).listen(process.env.PORT || port, (resq) =>{
//         console.log(`Example app listening at https://localhost:${port}`);
//     });

app.listen(process.env.PORT || port, (resq) =>{
    console.log(`Example app listening at http://localhost:${port}`);
});

// app.listen(process.env.PORT, () =>{
    
// });

