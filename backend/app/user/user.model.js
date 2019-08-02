const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    created_on: {
        type:Date,
        default: Date.now
    }      
});

mongoose.model('User', UserSchema, 'user');