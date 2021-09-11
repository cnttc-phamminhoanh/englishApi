const User = require('../models/User');

const index = async (req, res, next) => {
    
    const users = await User.find({});
    
    return res.status(200).json({users: users});
}

const newUser = async (req, res, next) => {

    const newUser = new User(req.body);

    await newUser.save();

    return res.status(201).json({user: newUser});
}

const getUser = async (req, res, next) => {

}

module.exports = {
    index,
    newUser,
    getUser
}