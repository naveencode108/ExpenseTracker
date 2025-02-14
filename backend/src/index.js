import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import { connectDB } from './config/db.js';

const app=express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
     origin:'http://localhost:5173',
     methods:['GET','POST','PUT','DELETE']
}));

app.use('/api/auth',authRoutes);
app.use('/api/budget',budgetRoutes);
app.use('/api/expense',expenseRoutes);


app.listen(3000,()=>{
    console.log('Server is running..');
})