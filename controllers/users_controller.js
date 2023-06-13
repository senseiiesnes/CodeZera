const User = require("../models/user");

module.exports.profile = (req, res) => {
  return res.end("<h1>Users Profile</h1>");
};

module.exports.signup = (req, res) => {
  return res.render("user_sign_up", {
    title: "Codezera | Sign Up",
  });
};

module.exports.signin = (req, res) => {
  return res.render("user_sign_in", {
    title: "Codezera | Sign In",
  });
};

module.exports.create = (req, res) => {
  if (req.body.password != req.body.cpassword) {
    return res.redirect("back");
  }
  console.log(req.body);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("error in finding user in signing up!", err);
      return;
    }
    if (!user) {
      User.create(req.body, (err, user) => {
        if (err) {
          console.log("error in user credentials for signing up!", err);
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      res.redirect("back");
    }
  });
};

module.exports.createSession = (req, res) => {
  User.findOne({email:req.body.email}, (err,user)=>{
    if (err) {
      console.log("error in signing in!", err);
      return;
    }
    if(user){
      if(req.body.password!=user.password){
        return res.redirect('back');
      }
      res.cookie('user_id',user.id);
      return res.redirect('/users/profile');
    }
    else{
      return res.redirect('back');
    }
  });
};
