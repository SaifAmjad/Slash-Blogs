const {NotFound}=require('../errors/index')

const notFound=(req,res,next)=>{
    next(new NotFound('This page cannot be found'));
}

module.exports=notFound;