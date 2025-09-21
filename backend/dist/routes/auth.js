"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_Validation_1 = require("../utils/zod_Validation");
const model_1 = require("../models/model");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("../utils/auth");
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    const parsedData = zod_Validation_1.AdminLoginSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ error: parsedData.error });
    }
    const { email, password } = parsedData.data;
    try {
        const admin = await model_1.AdminModel.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid Credential , No User Found" });
        }
        const match = await (0, auth_1.comparePassword)(password, admin.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        const { accessToken, refreshToken } = (0, auth_1.generateTokens)({ userId: admin._id.toString(), role: "admin" });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
router.post('/signup', async (req, res) => {
    const parsedData = zod_Validation_1.AdminLoginSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ error: parsedData.error });
    }
    const { email, password } = parsedData.data;
    const hashedPassword = await (0, auth_1.hashPassword)(password);
    try {
        const admin = await model_1.AdminModel.create({
            email,
            password: hashedPassword
        });
        res.status(200).json({
            message: "Admin Creation Successful",
            admin
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Admin Creation UnSuccessful"
        });
    }
});
router.post("/refresh", async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }
        const decoded = (0, auth_1.verifyRefreshToken)(refreshToken);
        if (!decoded) {
            return res.status(400).json({
                message: "Refresh token expired"
            });
        }
        const user = await model_1.AdminModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const { accessToken, refreshToken: newRefreshToken } = (0, auth_1.generateTokens)({
            userId: user._id.toString(),
            role: decoded.role,
        });
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken });
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ message: "Invalid or expired refresh token" });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map