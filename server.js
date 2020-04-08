const express = require('express');
const app = express();
const port = 8080;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/registration.html');
});

app.get('/css/styles.css', function(req, res){
    res.sendFile(__dirname + '/css/styles.css');
});

app.get('/js/script.js', function(req, res){
    res.sendFile(__dirname + '/js/script.js');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))