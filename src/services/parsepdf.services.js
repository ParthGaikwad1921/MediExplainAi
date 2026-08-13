import fs from "fs";
import pdf from "pdf-parse";
import { ApiError } from "../utils/ApiError.js";

const parsePdf = async(localFilePath)=>{
    try {
        const binaryData = fs.readFileSync(localFilePath);

        const parse = await pdf(binaryData);

        const data = parse.text;

        return data;

    } catch (error) {
        throw new ApiError(501,error.message || "something went wrong while parsing the pdf");
    }
}

export {parsePdf}