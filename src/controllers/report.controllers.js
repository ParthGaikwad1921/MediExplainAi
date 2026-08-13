import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { Report} from "../models/report.model.js";
import { uploadOnCloudinary } from "../services/cloudinary.services.js";
import { parsePdf} from "../services/parsepdf.services.js";

const createReport = asyncHandler(async(req,res)=>{
    const {symptoms
        ,medicine
        ,conditions
        ,doctorName
        ,laboratoryName
        ,hospitalName} = req.body;

    if( !symptoms ||
        !medicine ||
        !conditions ||
        !doctorName ||
        !laboratoryName ||
        !hospitalName 
    ){
        throw new ApiError(400,"All fields are required");
    }

    const reportFileLocalPath = req.files?.reportFile?.[0]?.path ;

    if(!reportFileLocalPath){
        throw new ApiError(400,"report file is required");
    }

    const text = await parsePdf(reportFileLocalPath);

    if(!text){
        throw new ApiError(500,"something went wrong while parsing the pdf");
    }

    const cloudinary = await uploadOnCloudinary(reportFileLocalPath);

    if(!cloudinary){
        throw new ApiError(500,"Something went wrong while uploadng the file on cloudinary ");
    }

    const createReport = await Report.create({
        owner:req.user?._id,
        symptoms,
        medicine,
        conditions,
        laboratoryName,
        reportFile:cloudinary.url,
        reportFilePublicId:cloudinary.public_id,
        doctorName,
        hospitalName,
        extractedText:text
    }).select("-extractedText");

    res
    .status(201)
    .json(
        new ApiResponce(
            201,
            createReport,
            "Report created succsefully"
        )
    )


});

const myReports = asyncHandler(async(req,res)=>{
    
})

export {createReport,myReports}