const Deck = require('../models/Deck');
const User = require('../models/User');

const index = async (req, res, next) => {
    
    const users = await User.find({});
    
    return res.status(200).json({
        users: users
    });
}

const newUser = async (req, res, next) => {

    const newUser = new User(req.body);

    await newUser.save();

    return res.status(201).json({
        user: newUser
    });
}

const newUserDeck = async (req, res, next) => {
    
    const { userId } = req.params;

    const newDeck = new Deck(req.body);

    const user = await User.findById(userId);

    newDeck.owner = user;

    await newDeck.save();

    user.decks.push(newDeck._id);

    await user.save();

    return res.status(201).json({
        deck: newDeck
    })
}

const getUserDeck = async (req, res, next) => {

    const { userId } = req.params;

    const user = await User.findById(userId).populate('decks');

    return res.status(200).json({
        decks: user.decks
    })
}

const getUser = async (req, res, next) => {
    
    const { userId } = req.value.params;

    const user = await User.findById(userId);

    return res.status(200).json({
        user: user
    });
}

const replaceUser = async (req, res, next) => {
   
    const { userId } = req.params;

    const newUser = req.body;

    const result = await User.findByIdAndUpdate(userId, newUser);

    return res.status(200).json({
        user: result
    });
}

const updateUser = async (req, res, next) => {
    
    const { userId } = req.params;

    const newUser = req.body;

    const result = await User.findByIdAndUpdate(userId, newUser);

    return res.status(200).json({
        user: result
    });
}

module.exports = {
    index,
    newUser,
    getUser,
    replaceUser,
    updateUser,
    newUserDeck,
    getUserDeck
}