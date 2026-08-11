import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
        uppercase:true,
    },
    gender:{
        type:String,
        required:true,
        trim:true,
        enum:["male","female"]
    },
    bloodGroup:{
        type:String,
        required:true,
        trim:true,
        enum:["A+","B+","A-","B-","O+","O-","AB+","AB-"]
    },
    refreshToken:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    dateOfBirth:{
        type:Date,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
        trim:true,
        minlength:10,
        maxlength:10
    }
},
{
    timestamps:true
}
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){

    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            fullname:this.fullname,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema);