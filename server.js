const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const port = 80;
const MongoClient = require('mongodb').MongoClient;
const requestCount = new Map();

app.set('view engine', 'pug');

app.get('/', (req, res) =>{
    res.render('registration', {'recaptcha' : true});
});

app.get('/css/styles.css', (req, res) =>{
    res.sendFile(__dirname + '/css/styles.css');
});

app.get('/js/script.js', (req, res) =>{
    res.sendFile(__dirname + '/js/script.js');
});

app.post('/submit', (req, res) =>{
    console.log(req.connection.remoteAddress);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))