const {StatusCodes}=require('http-status-codes');
const asyncHandler=require('../middleware/asyncHandler');
const User=require('../model/userSchema');
const Blogs=require('../model/blogsSchema');
const { BadRequest, UnAuthourized, NotFound } = require('../errors');

const createBlog=asyncHandler(async(req,res)=>{
    const{title,imgURL,paragragh,category}=req.body;
    const{id}=req.user;

    if(!title || !imgURL || !paragragh || !category){
        throw new BadRequest("Empty input fields");
    }

    const blog={
        title:title,
        imgURL:imgURL,
        paragragh:paragragh,
        category:category,
        owner:id
    }

    const createBlog=await Blogs.create(blog);

    const findUser=await User.findOne({_id:id});
    if(!findUser){
           throw new UnAuthourized("No user exist to create blog");
    }
 
    findUser.Blogs.push(createBlog._id);

    res.status(StatusCodes.CREATED).json({msg:`Blog created successfully for user ${findUser._id}`,success:true})
})

const getAllBlogs=asyncHandler(async(req,res)=>{
    let{page,search}=req.query;

    let pageValue=Number(page) || 1; 
    let searchQuery=new RegExp(search,'i');
    const limit=10;

    const skip=limit*(pageValue-1);

    const blogCount=await Blogs.countDocuments({title:searchQuery});

    const totalPage= Math.ceil(blogCount/limit);
    if(page>totalPage){
        throw new BadRequest('Requested page number exceeds the total number of pages');
    }
    
    const blog=await Blogs.find({title:searchQuery}).sort({createdAt:-1}).limit(limit).skip(skip);

    res.status(StatusCodes.OK).json({success:true,blog,blogCount})
    
})

const getCategoryBlogs=asyncHandler(async(req,res)=>{
   
    const blog=await Blogs.find({})

    res.status(StatusCodes.OK).json({success:true,blog})
    
})


const getBlog=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    const findBlog=await Blogs.findById({_id:id});

    if(!findBlog){
        throw new NotFound('No Blog with this id exist');
    }

    res.status(StatusCodes.OK).json({blog:findBlog,success:true});

})

const myBlog=asyncHandler(async(req,res)=>{
    const user=req.user.id;
    
    if(!user){
        throw new NotFound('No user find'); 
    }
    const findBlog=await Blogs.find({owner:user}).sort({createdAt:-1});
    if(!findBlog){
        throw new NotFound('No Blog with this owner exist');
    }

    res.status(StatusCodes.OK).json({blog:findBlog,success:true});

})

const editBlog=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    const user=req.user.id;
    const{title,category,imgURL,paragragh}=req.body;

    const findBlog=await Blogs.findById({_id:id,owner:user});
    if(!findBlog){
        throw new NotFound('No Blog with this id exist');
    }

    const blog=await Blogs.findByIdAndUpdate({_id:id},{title,category,imgURL,paragragh},{ new: true });
     
    res.status(StatusCodes.CREATED).json({blog,success:true});

}) 

const deleteBlog=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    const user=req.user.id;

    const findBlog=await Blogs.findById({_id:id,owner:user});
    if(!findBlog){
        throw new NotFound('No Blog with this id exist');
    }

    await Blogs.findByIdAndDelete({_id:id}); 

    res.status(StatusCodes.OK).json({msg:"Blog deleted successfully",success:true});

})

module.exports={createBlog,getAllBlogs,getBlog,myBlog,editBlog,deleteBlog,getCategoryBlogs}