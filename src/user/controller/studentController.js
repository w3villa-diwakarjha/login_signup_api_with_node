const User= require('../models/studentModels');
const auth= require('../userAuth/auth');
const bcrypt= require('bcrypt');
const cookie= require('cookie');
const studentsignupController=async(req,res)=>{
    try{
        console.log(req.body);
        const {username}= req.body;
        const userName= await User.findOne({username});
        console.log(userName)
        if(!userName)
        {
            console.log("Inside IF==>",username)
            const user= new User(req.body);
            await user.save();
            res.status(201).send(user);
        }else{
            res.status(400).send("Username Already Exist");
        }
    } catch(err){
        res.status(400).send(err);
    }
}


const studentloginController= async(req,res)=>{
    try{
        const{username,password}=req.body;
        const user= await User.findOne({username});
        if(!user){
            return res.status(401).send({error: 'Authentication Failed'})
        }
        const passwordMatch=await bcrypt.compare(password,user.password);
        if(passwordMatch)
        {
            const token= auth.generateToken(user);
            res.cookie('token',token,{httpOnly: true});
            res.json({message: 'Login Successful'})
        } else{
            res.status(401).json({error: 'Authentication Failed'});
        }
    }catch(err){
        res.status(500).send(err)
    }
}

module.exports={studentloginController,studentsignupController};
