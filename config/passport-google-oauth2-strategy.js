const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// Tell passport to use a new strategy for google login.
passport.use(
  new googleStrategy(
    {
      clientID:
        "208835500517-h6asfu082t314og1j4a7g59vkglbjv4l.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // find user
      User.findOne({ email: profile.emails[0].value }).exec((err, user) => {
        if (err) {
          console.log("Error in Google Strategy-Passport: ", err);
          return;
        }
        // console.log(accessToken, refreshToken);
        // console.log(profile);

        if (user) {
          // if found, set this user
          return done(null, user);
        } else {
          // if not found, create the user and set it as req.user (sign-in)
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            (err, user) => {
              if (err) {
                console.log("Error in Creating User: ", err);
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
