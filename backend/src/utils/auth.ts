import bcrypt from "bcrypt";
import jwt , {Jwt, SignOptions} from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

const SALT_ROUNDS = 10;
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const ACCESS_EXP :TokenExpiry = process.env.ACCESS_TOKEN_EXP as TokenExpiry  || "15m";
const REFRESH_EXP:TokenExpiry = process.env.REFRESH_TOKEN_EXP as TokenExpiry || "7d";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}


interface JwtPayload {
  userId: string;
  role : string
}

type TokenExpiry = "15m" | "30m" | "1h" | "7d" | "30d";



export function generateTokens(payload: JwtPayload) {
   const accessOptions: SignOptions = { expiresIn: ACCESS_EXP };
  const refreshOptions: SignOptions = { expiresIn: REFRESH_EXP };

  const accessToken = jwt.sign(payload, ACCESS_SECRET, accessOptions);
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, refreshOptions);
  return { accessToken, refreshToken };
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
}
