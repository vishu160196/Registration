const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true}, (error)=>{
    if(!error){
        console.log('connected to db successfully');
    }
    else{
        console.log('error connecting to database');
    }
});

const user = require('./user.model');