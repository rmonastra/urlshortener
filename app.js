//Dependencies the app.js will use to perform functions, list can be found in the package.json file.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const shortUrl = require('./models/shortUrl');
var dotenv = require("dotenv").config();
var shortid = require('shortid');
var randomstring = require("randomstring");




//Connection to database
let dbUrl = process.env.MONGOLAB_URI;
mongoose.connect(dbUrl);  

//Creates the app
app.use(bodyParser.json()); //tells body-parser to use json data
app.use(cors()); //allows app to handle cross-origin resource sharing

//Allows Node to use public folder's contents, ex. CSS, HTML etc
app.use(express.static(__dirname + "/public"));

//Database entry
app.get("/new/:userUrl(*)", (req, res) => {
    let { userUrl } = req.params; //returns parameters in the matched route.
    
    //Regex for checking proper URL format.
    let urlCheck = /((http|https)\:\/\/)?[a-zA-Z0-9\.\/\?\:@\-_=#]+\.([a-zA-Z0-9\&\.\/\?\:@\-_=#])*/g;
    let checkedUrl = urlCheck;
    
    if (checkedUrl.test(userUrl) === true) {
        console.log('Success');
        var shortId = randomstring.generate(6);
        console.log(shortId);
        let dbEntry = new shortUrl(
            {
                userUrl: userUrl,
                shorterUrl: shortId
            }
        );
        
        dbEntry.save();
        return res.json(dbEntry);
    } else {
        console.log('Invalid Url');
        return res.json({ userUrl: userUrl + ' is not a valid URL, try again' });
    }
});

app.get("/api/shorturl/:idURL", function(req, res) {
  URL.findOne({
    short_url: req.params.idURL
  }, function(err, doc) {
    return doc ? res.redirect("https://" + doc.original_url) : res.send("ID is not correct");
  });
});


//Listen on connection port
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on port: " + port);
});
