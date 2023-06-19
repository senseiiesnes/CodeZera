const Post = require("../models/post");

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
