import { NextFunction, Request, Response } from "express";
interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}
export default function verifyAdmin(req: AuthRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=verifyAdmin.d.ts.map