const exp = require('express');
const expressAsyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const User = require('../models/users.model');
const usersApp = exp.Router();
usersApp.use(exp.json());

//Create a user
usersApp.post('/create-user', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        role: req.body.role,
        otp: req.body.otp
    });
    const createdUser = await user.save();
    res.status(201).send({ message: "User Created Successfully", user: createdUser });
}));

//Get all users
usersApp.get('/get-users', expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).send(users);
}));

//Get user by id
usersApp.get('/get-user/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).send(user);
    }
    else {
        res.status(404).send({ message: "User Not Found" });
    }
}
));

//Update a user
usersApp.put('/update-user/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.mobile = req.body.mobile || user.mobile;
        user.password = req.body.password || user.password;
        user.role = req.body.role || user.role;
        user.otp = req.body.otp || user.otp;
        const updatedUser = await user.save();
        res.status(200).send({ message: "User Updated Successfully", user: updatedUser });
    }
    else {
        res.status(404).send({ message: "User Not Found" });
    }
}
));

//Delete a user
usersApp.delete('/delete-user/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.remove();
        res.status(200).send({ message: "User Deleted Successfully" });
    }
    else {
        res.status(404).send({ message: "User Not Found" });
    }
}
));

module.exports = usersApp;