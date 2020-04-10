const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');
app.use(bodyParser.urlencoded({extended: true}));
const port = 80;

const connection = require('./models');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const requestCount = new Map();

app.set('view engine', 'pug');

setTimeout(()=>{
    requestCount.clear();
}, 24*3600000);

app.get('/', (req, res) =>{
    let recaptcha = false;
    if(requestCount.get(req.connection.remoteAddress) >= 3)
        recaptcha = true;

    res.render('registration', {'recaptcha' : recaptcha});
});

app.get('/css/styles.css', (req, res) =>{
    res.sendFile(__dirname + '/css/styles.css');
});

app.get('/js/script.js', (req, res) =>{
    res.sendFile(__dirname + '/js/script.js');
});

function saveUserAndRespond(name, email, password, res){
    var user = new User({
        name: name,
        email: email,
        password: password
    });

    user.save((err, user)=>{
        if(err){
            return res.json({'message': 'dberror saving user'});
        }
        return res.json({"responseCode" : 0,"responseDesc" : "Success", "message" : "registered successfully"});
    });
}

app.post('/submit', (req, res) =>{
    let ip = req.connection.remoteAddress;
    if(requestCount.get(ip) === undefined){
        requestCount.set(ip, 0);
    }
    let count = requestCount.get(ip);

    let verifyCaptcha = count >= 3;

    count = count < 4 ? count+1 : count;
    requestCount.set(ip, count);

    if(verifyCaptcha){
        if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
            return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
        }
        // Put your secret key here.
        var secretKey = "6Ld9DugUAAAAABJoeL7qJoEYGLsTx5rUMqnwETlS";
        // req.connection.remoteAddress will provide IP address of connected user.
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
        // Hitting GET request to the URL, Google will respond with success or error scenario.
        request(verificationUrl,function(error,response,body) {
            body = JSON.parse(body);
            // Success will be true or false depending upon captcha validation.
            if(body.success !== undefined && !body.success) {
                return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
            }

            saveUserAndRespond(req.body.name, req.body.email, req.body.password, res);
        });
    }else{
        saveUserAndRespond(req.body.name, req.body.email, req.body.password, res);
    }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))