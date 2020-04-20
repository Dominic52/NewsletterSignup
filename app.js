const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");

let app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    console.log(req);
    let email = req.body.inputEmail;
    let fname = req.body.firstName;
    let lname = req.body.lastName;
    console.log(email, fname, lname);
    res.send(email);
})

app.listen(3000, function(){
    console.log("Port 3000");
})