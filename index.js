const express=require('express');
const app=express();
const bodyparser= require('body-parser');
const {connectToMongoDB}=require('./connection')
const dotenv= require('dotenv');
const cookieParser= require('cookie-parser')
dotenv.config();
const authenticate= require('./routes/student')

const port=process.env.PORT;

const mongodburl=process.env.MONGODB_URL;

connectToMongoDB(mongodburl)
.then(()=>{console.log(`MongoDB Connected`)})
.catch((err)=>{console.log(`Error is ${err}`)});

app.use(bodyparser.json());

app.use('/user', authenticate);
app.use(cookieParser());
app.get('/',(_,res)=>{
    res.json({msg: 'Hello world'})
})

app.listen(port,()=>{
    console.log(`Server is Running on port ${port}`);
})
