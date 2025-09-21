"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const rateLimiter_1 = require("./utils/rateLimiter");
const auth_1 = __importDefault(require("./routes/auth"));
const agent_1 = __importDefault(require("./routes/agent"));
const task_1 = __importDefault(require("./routes/task"));
const cors_1 = __importDefault(require("cors"));
const verifyAdmin_1 = __importDefault(require("./middleware/verifyAdmin"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
(0, db_1.connectDB)().then(() => console.log("Connected to DB"));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use("/api/tasks", express_1.default.text({ type: "text/plain" }));
app.use('/api/', rateLimiter_1.apiLimiter);
app.use('/api/auth', auth_1.default);
app.use('/api/agents', verifyAdmin_1.default, agent_1.default);
app.use('/api/tasks', verifyAdmin_1.default, task_1.default);
app.listen("3000", () => {
    console.log("Server has started ");
});
//cookie - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGNmYTgzNmJlYWQ2OTU0ZGU2ZWM4ZTEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTg0Mzk1MDUsImV4cCI6MTc1OTA0NDMwNX0.wW7DJyBBxXUkdO7VNwUbgNyqoGtyNqkJF4J81oX0-qY
//# sourceMappingURL=index.js.map