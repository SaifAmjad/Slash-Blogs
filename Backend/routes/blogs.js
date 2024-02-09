const express=require('express');
const authenticate=require('../middleware/authenticate');
const { createBlog, getAllBlogs, getBlog, editBlog, deleteBlog, myBlog, getCategoryBlogs } = require('../controllers/blogs');
const router=express.Router();


router.post('/',authenticate,createBlog);
router.get('/',getAllBlogs);
router.get('/categoryblogs',getCategoryBlogs);
router.get('/myblogs',authenticate,myBlog);
router.get('/:id',getBlog);
router.put('/:id',authenticate,editBlog);
router.delete('/:id',authenticate,deleteBlog);


module.exports=router;