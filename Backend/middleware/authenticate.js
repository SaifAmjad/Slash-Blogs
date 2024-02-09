const jwt=require('jsonwebtoken');
const{StatusCodes}=require('http-status-codes')

const authenticate=async(req,res,next)=>{
    const cookie=req.cookies.authToken

    try {
        const verify=await jwt.decode(cookie,process.env.SECRET);

        if(!verify){
            return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Token not authorized"})
        }

        req.user={
            id:verify.id,
            name:verify.name,
            email:verify.email
        }

        next();

    } catch (error) {
        console.log(error);
        next(error,'Not authenticated');
    }
}

module.exports=authenticate;