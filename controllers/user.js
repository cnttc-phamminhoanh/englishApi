const User = require('../models/User');

const index = (req, res, next) => {
    User.find({}).then((users) => {
        return res.status(200).json({
            message: users
        });
    });
}

module.exports = {
    index
}