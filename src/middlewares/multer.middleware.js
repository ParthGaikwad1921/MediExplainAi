import multer from "multer";

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads");
    },

    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req,file,cb) =>{
    if(file.mimetype === "application/pdf"){
        cb(null,true);
    }
    else{
        cb(new Error("Only pdf files allowed"),false);
    }
}

export const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize:10*1024*1024
    }
})