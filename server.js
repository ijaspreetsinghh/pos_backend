const express = require('express');
const res = require('express/lib/response');

const nodemailer = require("nodemailer"); 
const app = express();
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json();
app.post('/send_email', jsonParser, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
 res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
   
  main({
    'smtp': req.body.smtp,
    'from_email': req.body.from_email,
    'from_name': req.body.from_name,
    'port': req.body.port,
    'user_name': req.body.user_name,
    'password': req.body.password,
    'receiver': req.body.receiver,
    'subject': req.body.subject,
    'message': req.body.message, 'is_ssl': req.body.is_ssl
  }).then((data) => res.send(data));
});

app.listen(process.env.process || 8080, function () {
  console.log('Now Listening');
})





async function main({smtp,from_email,from_name,port,user_name,password,receiver,subject,message,is_ssl}) {

  let transporter = nodemailer.createTransport({
    host:smtp,
    port: port,
    secure:is_ssl,  
    auth: {
      user: user_name, 
      pass: password, 
    },
  });

  let info = await transporter.sendMail({
    from: `${from_name} ${from_email}`, 
    to: receiver, 
    subject: subject, 
    text: message, priority: 'high'

  });
    console.log("Message sent: %s", info.messageId);



  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return info.messageId;


}