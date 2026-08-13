import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createReport } from "../controllers/report.controllers.js";

const router = express.Router();

router.route("/create-report").post(verifyJWT,upload.fields([
    {
        name:"reportFile",
        maxCount:1
    }
]),createReport);
