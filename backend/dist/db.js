"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let cached = globalThis._mongoConnection;
if (!cached) {
    cached = { conn: null, promise: null };
    globalThis._mongoConnection = cached;
}
async function connectDB() {
    const MONGO_URL = process.env.MONGO_DB_URL;
    if (!MONGO_URL)
        throw new Error("MONGO_DB_URL environment variable not set");
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose_1.default.connect(MONGO_URL).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
//# sourceMappingURL=db.js.map