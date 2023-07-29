const queue = require("../config/kue");

const commentsMailer = require("../mailers/comments_mailer");

queue.process("emails", (job, done) => {
  console.log("Emails worker is Doing Its Job!!", job.data);

  commentsMailer.newComment(job.data);

  done();
});
