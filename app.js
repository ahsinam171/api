require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("././api/models/user");
const tournament = require("././api/models/tournament");
// const admin = require('././api/models/auth');

const userRoutes = require("./api/routes/user");
// const adminRoutes = require('./api/routes/auth');
const Users = require("././api/models/user");

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.ut72l.mongodb.net/fyp_db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.warn("connected with mongoDB");
  });

// Users.find({},function(err,users){
//     if (err) {
//         console.warn(err)}
//         else{
//     console.warn(users)};
// })

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accep, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Method", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
