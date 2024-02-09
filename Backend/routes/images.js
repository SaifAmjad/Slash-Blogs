const express=require('express');
const multer=require('multer');
const imageUpload=require('../controllers/images')

const router=express.Router();

const storage=multer.memoryStorage();
const upload = multer({ storage })

router.post('/',upload.single('img'),imageUpload);                                             

module.exports=router;