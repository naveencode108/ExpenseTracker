import userModel from '../models/userModel.js'
import budgetModel from '../models/budgetModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyGoogleToken } from '../config/googleTokenDecode.js';
import expenseModel from '../models/expenseModel.js';

export const googleLogin = async (req, res) => {
    try {

        let token = req.headers.authorization.replace('Bearer', '');
        if (!token) return res.status(400).json({ success: false, message: "Token is not provided" });

        let { name, email, picture } = await verifyGoogleToken(token)

        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({
                name: name.trim(),
                email
            })
        }

        let clientToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({
            success: true,
            message: "Logged in",
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            clientToken
        })

    } catch (er) {
        return res.status(500).json({ success: false, message: er.message });
    }
}

export const loginUser = async (req, res) => {
    try {

        let { email, password } = req.body;

        if (!email || !password) return res.status(401).json({ success: false, message: "Invalid email or password" });

        let user = await userModel.findOne({ email });

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        let comparePass = await bcrypt.compare(password, user.password);

        if (comparePass) return res.status(400).json({ success: false, message: "Invalid email or password" });

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({
            success: true,
            message: "Logged in",
            data: {
                id: user._id,
                email: user.email
            },
            token
        })


    } catch (er) {
        return res.status(500).json({ success: false, message: er.message });
    }
}

export const signupUser = async (req, res) => {
    try {

        let { name, email, password } = req.body;

        if (!email || !password || !name) return res.status(401).json({ success: false, message: "All field are required" });

        let user = await userModel.findOne({ email });

        if (user) return res.status(409).json({ success: false, message: 'User email exist' });

        let hashPass = await bcrypt.hash(password, 10);

        await userModel.create({
            name,
            email,
            password: hashPass
        })

        return res.status(200).json({ success: true, message: 'User Registred' });
    } catch (er) {
        return res.status(500).json({ success: false, message: er.message });
    }
}

export const dashboardOverview = async (req, res) => {
    try {

        let userId = req.userId;

        let budgetCount = await budgetModel.countDocuments({ userId });

        let budgetTotalAmount = (await budgetModel.find({ userId })).reduce((acc, it) => {
            return acc + it.amount;
        }, 0)

        let totalExpense = (await expenseModel.find({ userId })).reduce((acc, it) => {
            return acc + it.expenseAmount;
        }, 0);

        return res.status(200).json({
            success: true, data: [
                { name: "Total Budget", value: budgetCount },
                { name: "Total Expense", value: totalExpense },
                { name: "Total No Of Budget", value: budgetTotalAmount }
            ]
        });

    } catch (er) {
        return res.status(500).json({ success: false, message: er.message });
    }
}