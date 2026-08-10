import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

const generateAccessTokenAndRefreshToken = async(userId) =>{
    try {
        const findUser = await User.findById(userId);

        const refreshToken = findUser.generateRefreshToken();
        const accessToken = findUser.generateAccessToken();

        findUser.refreshToken = refreshToken;
        await findUser.save({validateBeforeSave: false});

        return {accessToken,refreshToken};
        
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating acces and refresh token");
    }
}

const registerUser = asyncHandler(async(req,res)=>{
    const{
        email,
        password,
        phoneNumber,
        dateOfBirth,
        gender,
        fullName,
        bloodGroup
    } = req.body;

    if(!email ||
        !password ||
        !phoneNumber ||
        !dateOfBirth ||
        !gender ||
        !fullName ||
        !bloodGroup){
        throw new ApiError(400,"All the field mentioned above are required");
    }

    const userExists = await User.findOne({email});

    if(userExists){
        throw new ApiError(409,"User with the above email already exists");
    }

    const createUser = await User.create({
        fullname=fullName,
        gender,
        bloodGroup,
        email,
        password,
        dateOfBirth,
        phoneNumber,
    });

    const getUser = await User.findById(createUser._id).select(
        "-password -refreshToken"
    );

    if(!getUser){
        throw new ApiError(500,"something went wrong while registering the user");
    }

    res
    .status(201)
    .json(
        new ApiResponce(
            201,
            getUser,
            "User succsefully registered"
        )
    )
});

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    if(!email){
        throw new ApiError(400,"Email is requird");
    }

    const findUser = await User.findOne({email});

    if(!findUser){
        throw new ApiError(401,"User with email does not exists");
    }

    const isPasswordCorrect = await findUser.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiError(404,"Incorrect password");
    }

    const{accessToken,refreshToken} = await generateAccessTokenAndRefreshToken(findUser._id);

    const loggedInUser = await User.findById(findUser._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    };

    res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponce(
            200,
            loggedInUser,
            "User loggedIn succesfully"
        )
    )
});