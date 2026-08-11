import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError} from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const verifyJWT = asyncHandler(async(req,res,next)=>{
    try {
        const Token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

        if(!Token){
            throw new ApiError(401,"Invalid access Token");
        }

        const verifyToken = jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET);

        if(!verifyToken){
            throw new ApiError(401,"Access token no found");
        }

        const findUser = await User.findById(verifyToken?._id).select("-password -refreshToken");
        
        if(!findUser){
            throw new ApiError(401,"Invalid access Token");
        }

        req.user = findUser;
        next();
    } catch (error) {
        throw new ApiError(401,error.message || "invalid Access Token ");
    }
});

export {verifyJWT}