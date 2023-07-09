const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// Configure Passport to use LocalStrategy for authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Use "email" field as the username field
      passReqToCallback: true
    },
    (req, email, password, done) => {
      // Find the user by email in the database
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          req.flash('error',err);
          return done(err);
        }
        if (!user || user.password != password) {
          // If user not found or password doesn't match, authentication fails
          req.flash('error',"Invalid Credentials.");
          return done(null, false);
        }
        // Authentication successful, pass the user object to the next middleware
        return done(null, user);
      });
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  // Find user by ID in the database
  User.findById(id, (err, user) => {
    if (err) {
      console.log("Error in DeSerializing user --> Passport");
      return done(err);
    }
    // Return user object
    return done(null, user);
  });
});

// Middleware to check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
  // If the user is signed in, proceed to the next middleware
  if (req.isAuthenticated()) {
    return next();
  }
  // If the user is not signed in, redirect to the sign-in page
  return res.redirect('/users/sign-in');
};

// Middleware to set the authenticated user in locals for views
passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    // Set the current signed-in user to res.locals.user for views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
