var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
app.options('*', cors());
var router = express.Router();
require('dotenv').config();

router.post('/', (req, res, next) => {
  res.json('it work')
});

router.post('/uploadImgur', (req, res, next) => {
  // var formData = new FormData();
  // const selectedFile = req.image;
  // formData.append('image',selectedFile);
  
  // console.log(process.env.CLIENT_ID);
  console.log(req);
  // console.log(req);

  const axios = require('axios');

  axios({
    method: 'post',
    url: 'https://api.imgur.com/3/image',
    data: req.body.fdata,
    headers: {
      'Authorization':`Client-ID ${process.env.CLIENT_ID}`,
      'Content-Type':'json'
    }
  })
  .then(
    (response) => {
      res = response
    },
    (error) => {
      // console.log('False');
      console.log(error.response.data);
    }
  );
});

module.exports = router;