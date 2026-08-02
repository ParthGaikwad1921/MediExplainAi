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
)

export const User = mongoose.model("User",userSchema);