export declare function hashPassword(password: string): Promise<string>;
export declare function comparePassword(password: string, hash: string): Promise<boolean>;
interface JwtPayload {
    userId: string;
    role: string;
}
export declare function generateTokens(payload: JwtPayload): {
    accessToken: string;
    refreshToken: string;
};
export declare function verifyAccessToken(token: string): JwtPayload;
export declare function verifyRefreshToken(token: string): JwtPayload;
export {};
//# sourceMappingURL=auth.d.ts.map