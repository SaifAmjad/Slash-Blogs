const { CustomError } = require("../errors");


const expressError=(err, req, res, next)=>{

    if(err instanceof CustomError){
        return res.status(err.status).json({msg:err.msg});
    }
    
    console.log(err)
    res.status(500).json(err);
    
}

module.exports=expressError;