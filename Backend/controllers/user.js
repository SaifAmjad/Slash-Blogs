const User=require('../model/userSchema');
const asyncHandler=require('../middleware/asyncHandler');
const {StatusCodes}=require('http-status-codes');
const nodemailer=require('nodemailer');
const { BadRequest, NotFound } = require('../errors');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.OTPPASS
    }
})


const createUser=asyncHandler(async(req,res)=>{
    const{name,email,password}=req.body;

    if(!name || !email || !password){ 
        throw new BadRequest('Empty input fields'); 
    } 

    const findUser=await User.findOne({email});
    if(findUser){
        throw new BadRequest("User already exist");
    }

    const user= await User.create({...req.body});
   
    res.status(StatusCodes.CREATED).json({msg:"User registered",success:true});

})

const sendOtp=asyncHandler(async(req,res)=>{
    const{email}=req.body;

    if(!email){
        throw new BadRequest('Provide email field in otp');
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'OTP for verification',
        text: `Your are about to enter the world of intellects publishing their thoughts on SLASH 
                
        
                 Your OTP for verification is ${otp}`,
    };

    transporter.sendMail(mailOptions, async (err, info) => {
        if (err) {
            console.log(err);
            res.status(500).json({sucess:false});
        } else {
            res.status(StatusCodes.CREATED).json({ msg:'OTP sent successfully',otp ,success:true});
        }
    });

})

const checkUser=asyncHandler(async(req,res)=>{

    const{email}=req.body;

    if(!email){ 
        throw new BadRequest('No Email recived'); 
    }

    const findUser=await User.findOne({email});
    if(findUser){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"This email already exist",success:false});
    }

    res.json({success:true});

})

const decode=asyncHandler(async(req,res)=>{
    const userJwt=req.body.user;


        const verify=await jwt.decode(userJwt,'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');

        if(!verify){
            return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Token not authorized"})
        }

        res.status(StatusCodes.OK).json({email:verify.email,name:verify.name,success:true});
})

const setCookie=asyncHandler(async(req,res)=>{

    const{email}=req.body;

    if(!email){ 
        throw new BadRequest('No Email recived'); 
    }

    const findUser=await User.findOne({email});
    if(!findUser){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"No user with this email exist",success:false})
    }

    const token=await findUser.genToken(findUser.name,email);

    res.cookie('authToken',token,{httpOnly:false});
    res.status(StatusCodes.OK).json({msg:"successfully authenticated",success:true});

})

const login=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;

    if(!email || !password){ 
        throw new BadRequest('Empty input fields'); 
    }

    const findUser=await User.findOne({email});
    if(!findUser){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"No user with this email exist",success:false})
    }

    const compare=await bcrypt.compare(password,findUser.password);
    if(!compare){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Not correct password"});
    }

    res.status(StatusCodes.OK).json({msg:"successfully logedin",success:true});

})

const getUser=asyncHandler(async(req,res)=>{
    const{id}=req.params;

    const user=await User.findOne({_id:id});
    if(!user){
        throw new NotFound('No user with this id found');
    }

    res.status(StatusCodes.OK).json({user,success:true});

})

module.exports={createUser,sendOtp,login,getUser,setCookie,checkUser,decode}