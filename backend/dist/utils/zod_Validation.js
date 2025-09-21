"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskUpdateSchema = exports.AgentUpdateSchema = exports.TaskSchema = exports.AgentSchema = exports.AdminLoginSchema = exports.PasswordSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.PasswordSchema = zod_1.default
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password cannot exceed 64 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character");
exports.AdminLoginSchema = zod_1.default.object({
    email: zod_1.default.email({ message: "Valid email required" }),
    password: exports.PasswordSchema
});
exports.AgentSchema = zod_1.default.object({
    name: zod_1.default.string().min(3, { message: "too short" }).max(30, { message: "too long" }),
    email: zod_1.default.email({ message: "Valid Email Required" }),
    password: exports.PasswordSchema,
    phone: zod_1.default.string().regex(/^\d{10,15}$/, "Phone must be numeric and 10–15 digits")
});
exports.TaskSchema = zod_1.default.object({
    FirstName: zod_1.default.string().min(3, { message: "too short" }).max(30, { message: "too long" }),
    Phone: zod_1.default.string().regex(/^\d{10,15}$/, "Phone must be numeric and 10–15 digits"),
    Notes: zod_1.default.string()
});
exports.AgentUpdateSchema = exports.AgentSchema.partial();
exports.TaskUpdateSchema = exports.TaskSchema.partial();
//# sourceMappingURL=zod_Validation.js.map