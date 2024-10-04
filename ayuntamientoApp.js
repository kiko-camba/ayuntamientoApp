import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import routes from   './routes/routes.js'

dotenv.config()

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;
const app = express();

app.use(express.json());
app.use(routes)

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
