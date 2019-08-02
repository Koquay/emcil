const UserService = require('./user.service');

exports.login = async (req, res) => {
    console.log('*** User Controller *** ')
    try {
        const user = UserService.login(req.body.user)
        return res.status(301).json({user});
    } catch(error) {
        throw error;
    }
    
}