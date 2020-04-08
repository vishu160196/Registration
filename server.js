const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const port = 8080;

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/registration.html');
});

app.get('/css/styles.css', (req, res) =>{
    res.sendFile(__dirname + '/css/styles.css');
});

app.get('/js/script.js', (req, res) =>{
    res.sendFile(__dirname + '/js/script.js');
});

app.post('/submit', (req, res) =>{
    console.log(req.body);
    res.sendFile(__dirname + '/registration.html');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))