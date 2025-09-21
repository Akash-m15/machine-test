import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  statusCode: 429,
  message: "Too many requests from this IP, please try again after a minute",
  standardHeaders: true,
  legacyHeaders: false,
});