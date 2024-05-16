const User = require('../models/user');
const {createCustomError} = require('../error/customError');

const signUp = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
        return next(createCustomError('Password does not matched!', 400));
    }
    const user = await User.create({ name, email, password });

    const token = user.createToken();

    res.status(201).json({ user: {name: user.name}, token });
}

const signIn = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email && !password) {
        return next(createCustomError('Invalid Credential!', 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
        return next(createCustomError('Invalid Credential!', 400));
    }
    const isMatchPass = await user.comparePassword(password);

    if (!isMatchPass) {
        return next(createCustomError('Invalid Credential!', 400));
    }

    const token = user.createToken();
    res.status(201).json({ user: { name: user.name }, token });
}

const logout = (req, res) => {
    res.send('logout User...');
}

module.exports = {
    signUp,
    signIn,
    logout
}