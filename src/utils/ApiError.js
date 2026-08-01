class ApiError extends Error{
    
    constructor(
        statuscode,
        message="something went wrong",
        errors=[],
        stackTrace="")
        {
            super(message);
            this.message=message;
            this.statuscode=statuscode;
            this.errors=errors;
            this.data=null;
            this.success=false;

            if(stackTrace){
                this.stackTrace=stackTrace
            }
            else{
                Error.captureStackTrace(this,this.constructor);
            }
        }
}

export {ApiError}