import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/auth";
import { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request{
      user?: {
        userId: string;
        role: string;
      };
    }
export default function verifyAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  try {

    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(401).json({
        message: "no token provided"
      })
    }

    const decoded: JwtPayload = verifyAccessToken(accessToken);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
   console.log(decoded)

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  }
   catch (err){
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}