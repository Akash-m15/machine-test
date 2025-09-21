"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = verifyAdmin;
const auth_1 = require("../utils/auth");
function verifyAdmin(req, res, next) {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            return res.status(401).json({
                message: "no token provided"
            });
        }
        const decoded = (0, auth_1.verifyAccessToken)(accessToken);
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        console.log(decoded);
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };
        next();
    }
    catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
//# sourceMappingURL=verifyAdmin.js.map