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
    let email = req.body.inputEmail;
    let fname = req.body.firstName;
    let lname = req.body.lastName;

    const data = {
        members:[{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: fname,
                LNAME: lname
            }
        }]
    };

    const jsonData = JSON.stringify(data);
    const endpoint = "https://us4.api.mailchimp.com/3.0/lists/a4fb8af0fe";
    const options = {
        method: 'POST',
        auth: "dominic:7517b877c9bd8b05e9f2fe9d7788bd5a-us4"
    }

    const request = https.request(endpoint, options, function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Port 3000");
});