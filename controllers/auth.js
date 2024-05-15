const User = require('../models/user');
const {createCustomError} = require('../error/customError');

const signUp = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
        return next(createCustomError('Password does not matched!', 400));
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({ user });
}

const signIn = (req, res) => {
    res.send(req.body);
}

const logout = (req, res) => {
    res.send('logout User...');
}

module.exports = {
    signUp,
    signIn,
    logout
}