const cloudinary=require('cloudinary').v2;
const asyncHandler=require('../middleware/asyncHandler');
const { NotFound } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const sharp=require('sharp');

cloudinary.config({  
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});


const imageUpload=asyncHandler(async(req,res)=>{
    const file=req.file;

    if(!file){
        throw new NotFound('No image uploaded found');
    }

    sharp(file.buffer).resize({ width: 800 })
    .toBuffer(async(err,data)=>{

        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).json({msg:err});
        }


         cloudinary.uploader.upload_stream({ resource_type: 'auto' },async(err,output)=>{
            if(err){
                console.log(err);
                return res.status(StatusCodes.CONFLICT).json({msg:err});
            }
            
            if(!output.url){
                return res.status(StatusCodes.NOT_FOUND).json({msg:"No img url found after cloudinary upload"});
            } 
           
            res.status(StatusCodes.OK).json({url:output.url,success:true}); 

        }).end(data);
 
    })
})


module.exports=imageUpload;

