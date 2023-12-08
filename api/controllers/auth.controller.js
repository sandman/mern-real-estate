import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
    // res.send('Login route is working!');
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json('User created successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}