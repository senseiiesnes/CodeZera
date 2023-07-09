const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");
const app = express();
const port = 8000;
const expresLayouts = require("express-ejs-layouts");
// Used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware to serve static files from the "assets" directory
app.use(express.static("./assets"));

// Middleware for using EJS layouts
app.use(expresLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "codezera",
    // TODO change the secret before deployment.
    secret: "s1mple",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, //in milliseconds
    },
    store: MongoStore.create(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
        mongoUrl: "mongodb://127.0.0.1/codezera_dev",
      },
      (err) => {
        console.log(err || "Connect-MongoDB setup ok.");
      }
    ),
  })
);

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Middleware to set the authenticated user in the request object
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// Use the routes defined in "./routes" directory
app.use("/", require("./routes"));

// Start the server
app.listen(port, (err) => {
  if (err) console.log(`Error in running the server: ${err}`);
  console.log(`Server is running on port: ${port}`);
});
