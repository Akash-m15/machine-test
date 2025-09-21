import { Request, Response, Router } from "express";
import { AdminLoginSchema } from "../utils/zod_Validation"
import { AdminModel } from "../models/model";
import dotenv from "dotenv"
import { comparePassword, generateTokens, hashPassword, verifyRefreshToken } from "../utils/auth";
dotenv.config();

const router = Router();

router.post('/login', async (req: Request, res: Response) => {

  const parsedData = AdminLoginSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({ error: parsedData.error });
  }

  const { email, password } = parsedData.data;

  try {
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid Credential , No User Found" });
    }

    const match = await comparePassword(password, admin.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const { accessToken, refreshToken } = generateTokens({ userId: admin._id.toString(), role: "admin" });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
})


router.post('/signup',async(req,res)=>{
  const parsedData = AdminLoginSchema.safeParse(req.body);
  
    if (!parsedData.success) {
      return res.status(400).json({ error: parsedData.error });
    }
  
    const { email, password } = parsedData.data;
  
    const hashedPassword = await hashPassword(password);
try{

  const admin = await AdminModel.create({
    email,
    password : hashedPassword
  })

  res.status(200).json({
    message:"Admin Creation Successful",
    admin
  })
}catch(err)
{
  console.log(err);
  res.status(400).json({
    message : "Admin Creation UnSuccessful"
  })
}
});

router.post("/refresh", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = verifyRefreshToken(refreshToken); 

    if(!decoded)
    {
      return res.status(400).json({
        message : "Refresh token expired"
      })
    }

    const user = await AdminModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      userId: user._id.toString(),
      role: decoded.role,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
});
export default router;