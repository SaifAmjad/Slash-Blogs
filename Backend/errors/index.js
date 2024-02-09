const http=require('http-status-codes')

class CustomError extends Error{
    constructor(msg){
        super(msg);
        this.msg=msg;
    }
}

class BadRequest extends CustomError{
    constructor(msg){
        super(msg);
        this.status=http.StatusCodes.BAD_REQUEST;
    }
}

class UnAuthourized extends CustomError{
    constructor(msg){
        super(msg);
        this.status=http.StatusCodes.UNAUTHORIZED;
    }
}

class NotFound extends CustomError{
    constructor(msg){
        super(msg);
        this.status=http.StatusCodes.NOT_FOUND;
    }
}

module.exports={CustomError,BadRequest,UnAuthourized,NotFound}
