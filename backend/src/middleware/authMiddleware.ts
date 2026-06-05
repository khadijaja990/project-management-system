import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Verify JWT token
export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    console.log("TOKEN VERIFIED");

    (req as any).user = decoded;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);

    res.status(401).json({
      message: "Invalid token",
    });
  }
};