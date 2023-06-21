const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");

// Route for accessing the user's profile, requires authentication
router.get("/profile/:id", passport.checkAuthentication, usersController.profile);

router.post("/update/:id", passport.checkAuthentication, usersController.update);

// Route for user sign-up
router.get("/sign-up", usersController.signup);

// Route for user sign-in
router.get("/sign-in", usersController.signin);

// Route for creating a new user
router.post("/create", usersController.create);

// Route for creating a session (signing in) using local authentication strategy
router.post(
  "/createSession",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

// Route for signing out (destroying the session)
router.get("/sign-out", usersController.destroySession);

module.exports = router;
