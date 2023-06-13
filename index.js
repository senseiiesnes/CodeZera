const express = require("express");
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const app = express();
const port = 8000;
const expresLayouts = require("express-ejs-layouts");
const bodyparser = require('body-parser');

app.use(express.urlencoded({extended:false}));

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expresLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use("/", require("./routes"));

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, (err) => {
  if (err) console.log(`Error in running the server: ${err}`);
  console.log(`Server is running on port: ${port}`);
});
