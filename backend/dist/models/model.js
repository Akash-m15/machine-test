"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = exports.AgentModel = exports.AdminModel = void 0;
const mongoose_1 = require("mongoose");
const AdminMongoSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}, { timestamps: true });
const AgentMongoSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true, required: true }
}, { timestamps: true });
const TaskMongoSchema = new mongoose_1.Schema({
    FirstName: { type: String, required: true },
    Phone: { type: String, required: true },
    Notes: { type: String },
    agentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "agent" }
}, { timestamps: true });
exports.AdminModel = (0, mongoose_1.model)("admin", AdminMongoSchema);
exports.AgentModel = (0, mongoose_1.model)("agent", AgentMongoSchema);
exports.TaskModel = (0, mongoose_1.model)("task", TaskMongoSchema);
//# sourceMappingURL=model.js.map