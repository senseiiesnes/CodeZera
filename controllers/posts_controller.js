const Post = require("../models/post");
const Comment = require("../models/comment");
// const postsMailer = require("../mailers/posts_mailer");

module.exports.create = async (req, res) => {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    // let mailPost = await post.populate('user', 'name email').execPopulate();
    // postsMailer.newPost(post);
    if (req.xhr) {
      post = await post.populate('user', 'name avatar');
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post Created!",
      });
    }
    req.flash("success", "Post Created Successfully!!");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.remove();
      await Comment.deleteMany({ post: req.params.id });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post deleted.",
        });
      }
      req.flash("success", "Post and all associated Comments deleted.");
      return res.redirect("back");
    } else {
      req.flash("error", "You cannot delete this Post.");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
