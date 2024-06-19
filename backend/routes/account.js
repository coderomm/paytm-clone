// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const Account = require('../db/accountModel');
const mongoose = require('mongoose');
const { z } = require('zod');

const router = express.Router();

const accountSchema = z.object({
    balance: z.number().nonnegative()
});

const transferSchema = z.object({
    amount: z.number().positive(),
    to: z.string()
});

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        // Validate account data using Zod schema
        const validation = accountSchema.safeParse(account);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid account data",
                errors: validation.error.issues
            });
        }

        res.json({
            balance: account.balance
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    try {
        const validation = transferSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validation.error.issues
            });
        }

        const { amount, to } = req.body;

        session.startTransaction();

        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid destination account"
            });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    } finally {
        session.endSession();
    }
});

module.exports = router;
