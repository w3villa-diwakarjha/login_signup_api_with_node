const mongoose= require('mongoose')
const Schema= mongoose.Schema;
const bcrypt= require('bcrypt');

const userSchema= new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    
},
{timestamps: true}
);

userSchema.pre('save',async function(next){
    const user= this;
    if(!user.isModified('password')) return next();
    try{
        const salt= await bcrypt.genSalt(10);
        const hashedpassword= await bcrypt.hash(user.password,salt);
        user.password=hashedpassword;
        next();
    }catch(err){
        return next(error);
    }
});

const User= mongoose.model('User',userSchema);
module.exports=User;