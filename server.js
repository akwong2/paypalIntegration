const express = require("express");

const app = express();
const port = 5000;

app.get("/", (req, res) => res.render("index"));

app.listen(port, () => {console.log("Server Started: " + port)});