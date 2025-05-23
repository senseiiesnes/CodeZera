const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require("../mailers/comments_mailer");
const commentEmailWorker = require("../workers/comment_email_worker");
const queue = require('../config/kue');

module.exports.create = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();

      comment = await comment.populate("user", "name email");
      // commentsMailer.newComment(comment);
      // let job = queue.create('emails', comment).save((err)=>{
      //   if(err) {console.log('Error in creating a queue: ', err); return;};
      //   console.log('Job Enqueued!',job.id);
      // })

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Comment created!",
        });
      }
      req.flash("success", "Comment published!");

      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports.destroy = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();
      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "comment deleted",
        });
      }
      req.flash("success", "Comment deleted!");

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return;
  }
};
