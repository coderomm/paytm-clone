// routes/user.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/userModel');
const Account = require('../db/accountModel');
const zod = require('zod');
const router = express.Router();
const { authMiddleware } = require('../middleware')

const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string().min(1),
    lastName: zod.string().min(1),
    password: zod.string().min(6)
});

router.post("/signup", async (req, res) => {
    const { success, error } = signupSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.issues
        });
    }

    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
        return res.status(409).json({
            message: "Email already taken"
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        await user.save();
        await Account.create({
            userId: user._id,
            balance: 1 + Math.random() * 10000
        });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 3600000
        });
        res.status(201).json({
            message: "User created successfully",
            token: token,
            user: user.select('-password')
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
});

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
})

router.post("/signin", async (req, res) => {
    const { success, error } = signinSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.issues
        });
    }

    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 3600000
        });

        res.status(200).json({
            message: "Signin successful",
            token: token,
            user: user.select('-password')
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
    const { success, error } = updateSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.issues
        });
    }

    const updateData = { ...req.body };

    // If password is being updated, hash it
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    try {
        await User.updateOne({ _id: req.userId }, updateData);
        res.json({
            message: "Updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
});

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(201).json({
            message: 'User found',
            user: user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user information",
            error: error.message
        });
    }
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.post("/logout", authMiddleware, (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 0
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});


module.exports = router;