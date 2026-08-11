import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser,
        loginUser,
        logoutUser,
        changeCurrentPassword,
        refreshAccessToken,
        changeUserDetails,
        getCurrentUser } from "../controllers/user.controllers.js";

const router=express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT,logoutUser);

router.route("/refresh-access-token").post(refreshAccessToken);

router.route("/change-password").post(verifyJWT,changeCurrentPassword);

router.route("/update-acc").patch(verifyJWT,changeUserDetails);

router.route("/get-user").get(verifyJWT,getCurrentUser);

export default router