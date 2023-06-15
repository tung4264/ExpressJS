// require('dotenv').config({path:__dirname+"../../.env"});

$('#submitBtn').click(function(){
    var formData = new FormData();
    formData.append("image", $("#getval")[0].files[0]);
    // console.log(formData.get("image"));
    $.ajax({
      url: './imgur/uploadImgur',
      type: 'POST',
      data: formData,
      enctype: 'multipart/form-data',
      cache: false,
      contentType: false,
      processData: false,
      success: function(response) {
        // console.log(response.data);
        var photo = response.data.link;
        var photo_hash = response.data.deletehash;
      },
      error: function (err) {
        // Code blocks if formData send failed
        console.log(err);
     },
    });

    //  $.ajax({
    //   url: "https://api.imgur.com/3/image",
    //   type: "POST",
    //   datatype: "json",
    //   headers: {
    //     "Authorization": "Client-ID "+ process.env.CLIENT_ID
    //   },
    //   data: formData,
    //   success: function(response) {
    //     console.log(response);
    //     var photo = response.data.link;
    //     var photo_hash = response.data.deletehash;
    //   },
    //   cache: false,
    //   contentType: false,
    //   processData: false
    // });
    
  });

document.getElementById('getval').addEventListener('change', readURL, true);
function readURL(){
    var file = document.getElementById("getval").files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
        document.getElementById('clock').style.backgroundImage = "url(" + reader.result + ")";        
    }
    if(file){
        reader.readAsDataURL(file);
    }else{
    }
}
  
  