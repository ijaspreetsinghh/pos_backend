// "use strict";
// const nodemailer = require("nodemailer");


// async function main({smtp,from_email,from_name,port,user_name,password,receiver,subject,message}) {

//   let transporter = nodemailer.createTransport({
//     host:smtp,
//     port: port,
//     secure:port==465? true:false, // true for 465, false for other ports
//     auth: {
//       user: user_name, // generated ethereal user
//       pass: password, // generated ethereal password
//     },
//   });

//   let info = await transporter.sendMail({
//     from: 'charle <charles.r@largesse.io>', // sender address
//     to: receiver, // list of receivers
//     subject: subject, // Subject line
//     text: message, // plain text body
//   // html body
//   });

//   console.log("Message sent: %s", info.messageId);



//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

// }

// // main().catch(console.error);