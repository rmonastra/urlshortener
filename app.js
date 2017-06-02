//Dependencies the app.js will use to perform functions, list can be found in the package.json file.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
//Creates the app
app.use(bodyParser.json()); //tells body-parser to use json data
app.use(cors());//allows app to handle cross-origin resource sharing
//Allows know to use public folder's contents, ex. CSS, HTML etc
app.use(express.static(__dirname + "/public"));
//Database entry
app.get("/new:urlToShorten(*)", (req, res) =>{
    let { urlToShorten} = req.params;
    console.log(urlToShorten);
});

app.get("/new:urlToShorten(*)", (req, res) =>{
    
});











//Listen on connection port
app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port: 3000");
});