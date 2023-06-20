const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = (req, res) => {
  Post.findById(req.body.post, (err, post) => {
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        (err, comment) => {
          if (err) {
            console.log(err);
            return;
          }
          post.comments.push(comment);
          post.save();
          res.redirect("/");
        }
      );
    }
  });
};
