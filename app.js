//Dependencies the app.js will use to perform functions, list can be found in the package.json file.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const shortUrl = require('./models/shortUrl');

//Connection to database
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/shortUrls");

//Creates the app
app.use(bodyParser.json()); //tells body-parser to use json data
app.use(cors()); //allows app to handle cross-origin resource sharing

//Allows know to use public folder's contents, ex. CSS, HTML etc
app.use(express.static(__dirname + "/public"));

//Database entry
app.get("/new/:userUrl(*)", (req, res) => {
    let { userUrl } = req.params;
    console.log(userUrl);
    let urlCheck = /((http|https)\:\/\/)?[a-zA-Z0-9\.\/\?\:@\-_=#]+\.([a-zA-Z0-9\&\.\/\?\:@\-_=#])*/g;

    let checkedUrl = urlCheck;

    if (checkedUrl.test(userUrl) === true) {
        console.log('Success');
        var shortId = Math.floor(Math.random()* 10000);

        let data = new shortUrl(
            {
                userUrl: userUrl,
                shorterUrl: shortId
            }
        );
        data.save();
        return res.json(data);
    } else {
        console.log('Fail');
        return res.json({ userUrl: userUrl + ' is not a valid URL, try again' });
    }
});


//Listen on connection port
let port = process.env.PORT || 3000;
app.listen(port || 3000, () => {
    console.log("Listening on port: " + port);
});