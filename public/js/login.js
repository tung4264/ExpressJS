var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

function login(_username,_password){
    $.ajax({
        url:'/api/login',
        type: 'POST',
        dataType: 'json',
        data: {username: _username,password:_password}
      })
      .then(data=>{
        console.log(data);
        setCookie('token',data.token,1);
      })
    .catch(err=>{
        console.log("Call api login false "+ err);
    })
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