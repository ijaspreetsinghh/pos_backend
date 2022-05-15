const express = require('express');
const res = require('express/lib/response');
const cors=require('cors');
const nodemailer = require("nodemailer"); 
const app = express();
var bodyParser = require('body-parser')
require('dotenv').config();
const API_KEY = process.env.API_KEY

var jsonParser = bodyParser.json();

app.use(cors());

app.post('/send_email', jsonParser, (req, response) => {

  if(req.body.api_key !== API_KEY){
    return response.status(400).json({
      status:400,
      message:"Secret key is unauthorized"
    })
  }
    response.set('Access-Control-Allow-Origin', "*");
    response.set('Access-Control-Allow-Methods', 'POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
   
  main({
    'smtp': req.body.smtp,
    'from_email':process.env.EMAIL,
    'from_name': req.body.from_name,
    'port': process.env.PORT,
    'user_name': req.body.user_name,
    'password': process.env.PASSWORD,
    'receiver': req.body.receiver,
    'subject': req.body.subject,
    'message': req.body.message, 
    'is_ssl': process.env.IS_SSL,
    "file":req.body.file,
    "filename":req.body.filename
  })
  .then(data=>{
    return response.status(200).json({
      status:200,
      message:"email sent successfully"
    })
  })
  .catch(err=>{
    return response.status(400).json({
      status:400,
      err:err
    })
  })
});

async function main({smtp,from_email,from_name,port,user_name,password,receiver,subject,message,is_ssl,filename,file}) {

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
    text: message, priority: 'high',
    attachments: [{
      filename: filename,
      content: new Buffer.from(file,'utf-8')
    }],
  });
    //console.log("Message sent: %s", info.messageId);
 // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return info.messageId;
}

app.listen(process.env.process || 8080, function () {
  console.log('server listening on port 8080');
})