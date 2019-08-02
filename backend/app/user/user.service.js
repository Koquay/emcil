require('./user.model');
const User = require('mongoose').model('User');

exports.login = async (user) => {
    try {
        console.log('user', user.email)
    } catch(error) {
        throw error;
    }
}