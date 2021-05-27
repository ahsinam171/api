const express = require("express");
const cors = require("cors");
require("dotenv").config(); //to use env variables
const http = require("http");
const app = require("./app");

const authRoutes = require("./api/routes/user");
app.use(express.json());
app.use(cors());

//middlewares
app.use("/api", authRoutes);

const port = process.env.PORT || 1100;
const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server up and running on port", port);
});
