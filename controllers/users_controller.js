const User = require("../models/user");

// Controller action for user profile
module.exports.profile = (req, res) => {
  // if (req.params.id) {
  //   // Find the user by their ID stored in the cookie
  //   User.findById(req.params.id, (err, user) => {
  //     if (err) {
  //       console.log("error in finding profile.", err);
  //       return;
  //     }
  //     if (user) {
  //       return res.render("user_profile", {
  //         title: "User Profile",
  //         user: user,
  //       });
  //     } else {
  //       return res.redirect("/users/sign-in");
  //     }
  //   });
  // } else {
  //   return res.redirect("/users/sign-in");
  // }
  User.findById(req.params.id, (err, user) => {
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};

module.exports.update = (req, res) => {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
      return res.redirect("back");
    });
  } else {
    return res.status(401).send("Unauthorized!!");
  }
};

// Controller action for user sign-up
module.exports.signup = (req, res) => {
  if (req.isAuthenticated()) {
    // If user is already authenticated, redirect to profile page
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Codezera | Sign Up",
  });
};

// Controller action for user sign-in
module.exports.signin = (req, res) => {
  if (req.isAuthenticated()) {
    // If user is already authenticated, redirect to profile page
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_in", {
    title: "Codezera | Sign In",
  });
};

// Controller action for creating a new user
module.exports.create = (req, res) => {
  if (req.body.password != req.body.cpassword) {
    // If password and confirm password do not match, redirect back to previous page
    return res.redirect("back");
  }
  console.log(req.body);
  // Check if the user already exists
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("error in finding user in signing up!", err);
      return;
    }
    if (!user) {
      // Create a new user with the provided credentials
      User.create(req.body, (err, user) => {
        if (err) {
          console.log("error in user credentials for signing up!", err);
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      // If user with the same email exists, redirect back to previous page
      res.redirect("back");
    }
  });
};

// Controller action for creating a session (signing in)
module.exports.createSession = (req, res) => {
  req.flash("success", "Logged In Successfully!");
  // Redirect to the homepage after successful sign-in
  return res.redirect("/");
};

// Controller action for destroying the session (signing out)
module.exports.destroySession = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have been Logged Out!");
    // Redirect to the homepage after successful sign-out
    res.redirect("/");
  });
};
