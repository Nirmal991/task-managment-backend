import express from 'express';
import helmet from 'helmet';
import cors from "cors";
import authRoutes from './routes/auth'
import dotenv from 'dotenv';
import { AuthRequest, requireAuth } from './middleware/authMiddleware';


dotenv.config();

const app = express();
app.use(helmet())
app.use(express.json())

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:8100",
    credentials: true, 
  })
);

app.use('/api/auth', authRoutes);

app.get('/api/home', requireAuth, (req: AuthRequest,res) =>{
     res.json({ message: `Welcome ${req.user?.username}! This is the protected home route.` });
})

export default app;