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
    // //add headers
    // const options = {
    //   headers: { "Authorization": "Client-ID " + process.env.CLIENT_ID }
    // };
  
    // //create body payload
    // const body = {
    //   data: formData
    // }; 
  // axios.post('https://api.imgur.com/3/image', body, options).then((response) => {
  //   //receive response
  //   // console.log(1);
  //   console.log(response);
  //   res.status(200).json({ status: 'success' });
  // }).catch((error) => {
  //   console.log(error)
  // });



  // $.ajax({
  //   url: "https://api.imgur.com/3/image",
  //   type: "POST",
  //   datatype: "json",
  //   headers: {
  //     "Authorization": "Client-ID " + process.env.CLIENT_ID
  //   },
  //   data: pformData,
  //   success: function (response) {
  //     console.log(response);
  //     var photo = response.data.link;
  //     var photo_hash = response.data.deletehash;
  //   },
  //   cache: false,
  //   contentType: false,
  //   processData: false
  // });
});

module.exports = router;