"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_Validation_1 = require("../utils/zod_Validation");
const auth_1 = require("../utils/auth");
const model_1 = require("../models/model");
const router = (0, express_1.Router)();
router.post('/create', async (req, res) => {
    const parsedData = zod_Validation_1.AgentSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ error: parsedData.error });
    }
    const { name, email, password, phone } = parsedData.data;
    const hashedPassword = await (0, auth_1.hashPassword)(password);
    try {
        const existing = await model_1.AgentModel.findOne({ $or: [{ email }, { phone }] });
        if (existing) {
            return res.status(400).json({ message: "Agent with email or phone already exists" });
        }
        const agent = await model_1.AgentModel.create({
            name,
            email,
            password: hashedPassword,
            phone
        });
        res.status(201).json({
            message: "Agent created successfully",
            agentId: agent._id
        });
    }
    catch (err) {
        console.log(err);
    }
});
router.get('/', async (req, res) => {
    try {
        const agents = await model_1.AgentModel.find();
        res.json({ agents });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error in finding Agents"
        });
    }
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const agent = await model_1.AgentModel.findOne({
            _id: id
        });
        if (!agent) {
            return res.status(404).json({
                message: "No agent Found"
            });
        }
        res.json({ agent });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error while finding Agent"
        });
    }
});
router.put('/:id', async (req, res) => {
    const parsedData = zod_Validation_1.AgentUpdateSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ error: parsedData.error });
    }
    const { name, email, phone, password } = parsedData.data;
    try {
        let hashedPassword;
        if (password) {
            hashedPassword = await (0, auth_1.hashPassword)(password);
        }
        const updatedData = { name, email, phone, password: hashedPassword };
        const agent = await model_1.AgentModel.findByIdAndUpdate(req.params.id, { $set: updatedData }, { new: true });
        if (!agent)
            return res.status(404).json({ message: "Agent not found" });
        res.json({ message: "Agent updated", agent });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const agent = await model_1.AgentModel.findByIdAndDelete(req.params.id);
        if (!agent)
            return res.status(404).json({ message: "Agent not found" });
        res.json({ message: "Agent deleted" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = router;
//# sourceMappingURL=agent.js.map