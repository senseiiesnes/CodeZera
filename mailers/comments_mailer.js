const nodemailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  console.log("Inside Nodemailer: ", comment);

  let htmlString = nodemailer.renderTemplate({comment:comment}, '/comments/new_comment.ejs')

  let mailoption = {
    from: "kushaljha6104@gmail.com",
    to: comment.user.email,
    subject: "New Comment Published",
    text: "Test mail",
    html: htmlString,
  };
  nodemailer.transporter.sendMail(mailoption, (err, info) => {
    if (err) {
      console.error('Error in Sending Mail.',err);
      return;
    }
    // console.log('Message Sent!',info);
    return;
  });
};
