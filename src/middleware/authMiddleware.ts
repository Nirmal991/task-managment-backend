import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    id: string;
    username: string
    email: string
}

export interface AuthRequest extends Request{
    user?: {id: string; username: string, email: string};
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction)=> {
    try{
        const authHeader = req.headers.authorization;
        const tokenFromHeader = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        const token = tokenFromHeader || (req.cookies && req.cookies.token) || null;

        if (!token) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }

        const secret = process.env.JWT_SECRET!;
        const decoded = jwt.verify(token, secret) as JwtPayload;
        req.user = { id: decoded.id, username: decoded.username, email: decoded.email };
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({ message: "Token is not valid" });
    }
}