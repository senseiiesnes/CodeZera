// const nodemailer = require("../config/nodemailer");

// module.exports.newPost = (post) => {
//   console.log("Inside Nodemailer: ", post);
//   let mailoption = {
//     from: "kushaljha6104@gmail.com",
//     to: post.user.email,
//     subject: "New Post Published",
//     text: "Acknowledgement mail",
//     html: "<h1>Your Post is now Published on CodeZera.<br> Have Fun!!</h1>",
//   };
//   nodemailer.transporter.sendMail(mailoption, (err, info) => {
//     if (err) {
//       console.error('Error in Sending Mail.',err);
//       return;
//     }
//     console.log('Message Sent!',info);
//     return;
//   });
// };
