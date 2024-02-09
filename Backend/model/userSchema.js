const Mongoose=require('mongoose');
const validate=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema=new Mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        validate:{
            validator: value=> validate.isEmail(value),
            msg:"Not a valid email"
        }
    },
    password:{
        type:String,
        required:true
    },
    Blogs:{
        type:[{type:Mongoose.Schema.Types.ObjectId,ref:'blogs'}],
        default:[]
    }
},{timestamps:true})

userSchema.pre('save',async function(){
    try {
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(this.password,salt);
        this.password=hash;
    } catch (error) {
        console.log(error);
    }
})

userSchema.methods.genToken=async function(name,email){
    try {
        const token=await jwt.sign({id:this._id,name,email},process.env.SECRET,{expiresIn:"2d"});
        return token;
    } catch (error) {
        console.log(error);
    }
}

module.exports=Mongoose.model('user',userSchema);

