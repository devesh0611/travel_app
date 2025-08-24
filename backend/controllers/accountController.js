const User = require('../models/Users')
const bcrypt = require("bcryptjs");

const editProfile = async (req, res) => {
    try {
        const { name, hall, gender } = req.body
        const user = await User.findById(req.user.id)
        if(!user)
            return res.status(400).json({message : "User not found"})
        user.name = name;
        user.hall = hall;
        user.gender = gender;
        await user.save();
        return res.status(200).json({message : "Updated successfully"})
    }
    catch(err) {
        return res.status(500).json({message : "Server Error"})
    }
}

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { editProfile, changePassword }