const Post = require("../models/post");

module.exports.home = (req, res) => {
  Post.find({})
    .populate("user")
    .exec((err, posts) => {
      return res.render("home", {
        title: "Codezera | Home",
        posts: posts,
      });
    });
};
