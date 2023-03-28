const jwt = require('jsonwebtoken');
var fs = require('fs');

// var privateKey = fs.readFileSync('./Key/private.pem');
// var token = jwt.sign({ username: 'nttung4' }, privateKey, { algorithm: 'RS256' });
// console.log(token);

var token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im50dHVuZzQiLCJpYXQiOjE2Nzk5OTg2MTJ9.eUoI3JiqhZBxmhgDp64l2ytUEHMj-d43M-qfLMlXskPLOghg_5Q5WDb9xhLeGlg8qjip2rf0JGCNQwy7kn3FcQ0cyUHgY-M-5RVT3GJEkRLbGH88iRzUkMpiIp4-9XB_ZmblrF9ihGLxoAIz7CPwOU_aiDELVI9ZOOm7pbfdClV0h_5lVwjtkW22stm_9lhkCB2LxJGJx0Hn9J3oAnmqzbSnDWG_OHEoU5fFMyOXC6qBSg_B9PycxBx-WoaME3NlpKztEa6j8fpIFyfu_oYRanrHKS48hceEMCV0flVcr2njM77-dDQBZT_I7zAy94ApFg6V3Q2QqV7NpizzSc6KLA'
var cert = fs.readFileSync('./Key/publickey.crt');  // get public key
jwt.verify(token, cert,{ algorithms: ['RS256'] }, function(err, decoded) {
  console.log(err);
  console.log(decoded);
});