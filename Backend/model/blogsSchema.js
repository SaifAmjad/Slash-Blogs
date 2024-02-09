const Mongoose=require('mongoose');

const blogsSchema=new Mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    paragragh:{
        type:String,
        required:true
    },
    imgURL:{
        type:String,
        required:true
    },
    owner:{ 
        type:Mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})

module.exports=Mongoose.model('blogs',blogsSchema);