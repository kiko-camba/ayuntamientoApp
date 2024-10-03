import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

const app = express();

app.use(express.json());

const connectDB = async () =>{
    try{
        await mongoose.connect(mongoUri);
        console.log('Database connected');
        
    }catch(error){
        console.log(error);

    }
}
connectDB()

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})
