const jwt= require('jsonwebtoken');
const dotenv= require('dotenv');
dotenv.config();
const secretkey= process.env.SECRET_KEY;
const generateToken=(user)=>{
    const payload={
        userId:user._id,
        username: user.username,
    };
    return jwt.sign(payload,secretkey,{
        expiresIn: '1h'
    });
}

module.exports={generateToken};