const User = require('../model/user.model')
const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}

const getUserById = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
}

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    const newUser = await user.save();
    res.status(201).json(newUser);

}

const updateUser = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
}

const deleteUser = async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    res.cookie('id',user.id).redirect('/')
}
const loginpage = (req, res) => {
    res.render('login');
}

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const profile = req.file?.path;
    console.log(req.file);
    const user = new User({ username, email, password, profile });
    const newUser = await user.save();
    // res.status(201).json(newUser);
    res.redirect('/user/login');
}
const signuppage = (req, res) => {
    res.render('signup');
}

const profile = async (req, res) => {
    res.render('profile');
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, login, loginpage, signup, signuppage , profile }





