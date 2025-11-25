import dotenv from 'dotenv';
import connectDB from './config/db';
import app from './app';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

(async ()=>{
    await connectDB(MONGO_URI);
    app.listen(5000, () =>{
        console.log(`Server running on port 5000`);
    });
})();