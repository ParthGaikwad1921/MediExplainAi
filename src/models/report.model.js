import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    symptoms:{
        type:[String],
        required:true,
        trim:true,
    },
    medicine:{
        type:[String],
        trim:true,
        required:true
    },
    conditions:{
        type:String ,
        required:true,
        trim:true,
        enum:["long-term","short-term"]
    },
    laboratoryName:{
        type:String,
        trim:true
    },
    aiSummary:{
        type:String,
        default:""
    },
    aiSuggestions:{
        type:String,
        default:""
    },
    reportFile:{
        type:String,
        required:true
    },
    reportFilePublicId:{
        type:String,
        default:""
    },
    doctorName:{
        type:String,
        trim:true,
        required:true
    },
    hospitalName:{
        type:String,
        required:true,
        trim:true
    },
    extractedText:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

export const Report = mongoose.model("Report",reportSchema);