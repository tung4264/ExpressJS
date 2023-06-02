// const path = require('path')
// var cookieParser = require('cookie-parser')
// var app = express()
// app.use(cookieParser())



function login(_username,_password){
  // alert("1")
  $.ajax({
        url:'./api/login',
        type: 'POST',
        dataType: "json",
        data: {username: _username,password:_password}
      }).done(function( data) {
        // alert(data.token);
        // debugger;
        setCookie('token',data.token,1);
        window.location.href = "./home";
        return false;
        
      }).fail(function(err){
        console.log("error fetching message"+err);
        return false;
      })
      // .then( function(data){
      //     console.log(data);
      //     setCookie('token',data.token,1);
      //     // window.location.href = "./home";
      //     self.location.href = "./home";
      // }).catch(function(err){
      //     // window.location.href = "./home"
      //     console.log("Call api login false "+ err);
      // })
      


}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  // login2

    