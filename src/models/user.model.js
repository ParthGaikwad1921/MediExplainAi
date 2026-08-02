import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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
        enum:["A+","B+","A-","B-","O+","O-","AB+"]
    },
    refreshToken:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    dateOfBirth:{
        type:Date,
        required:true,
        trim:true
    }
},
{
    timestamps:true
}
)

export const User = mongoose.model("User",UserSchema);