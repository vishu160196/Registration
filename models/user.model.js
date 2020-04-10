const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Required"
    },
    email: {
        type: String,
        required: "Required"
    },
    password: {
        type: String,
        required: "Required"
    }
});

mongoose.model("User", userSchema);