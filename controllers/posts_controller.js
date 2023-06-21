const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = (req, res) => {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    (err, post) => {
      if (err) {
        return console.log("Error creating post");
      }
      return res.redirect("back");
    }
  );
};

module.exports.destroy = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    // .id means converting the object id (_id) into string format.
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.params.id }, (err) => {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
