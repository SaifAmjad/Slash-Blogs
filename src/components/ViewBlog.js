import React, { useContext, useEffect, useState } from "react";
import Footer from "../pages/Footer";
import { useParams } from "react-router-dom";
import BlogContext from "../context/BlogContext";
import BlogLoading from "../pages/BlogLoading";


const ViewBlog = () => {
    const{id}=useParams();
    const context = useContext(BlogContext);
    const { blogs, getSingleBlog, getUser,totalBlogs } = context;
    const[user,setUser]=useState();
    const[loading,setLoading]=useState(true);


    const fetchUser=async(owner)=>{
        const ownerId=owner || ' ';
        try {
            const userData=await getUser(ownerId);
            setUser(userData.user);
            if(userData.success){
                setLoading(false); 
            }

        } catch (error) {
            console.log(error);
        }

    }


    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const owner=await getSingleBlog(id);
                if(owner.owner){
                    fetchUser(owner.owner);
                }
                
            } catch (error) {
                console.log(error)
            }

        }

        fetchData();
         
    },[]) 

    const Months=['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec']


  return (
    <>
    {loading?<BlogLoading/>:
     <div className="container-fluid custom-viewblog">
     <div className="row custom-viewblog-row">
       <div className="col-6 mt-4">
         <div className="row custom-viewblog-header">
           <span className="badge text-bg-dark mb-4">{blogs.category}</span>
           <h1>{blogs.title}</h1>
         </div>
         <div className="row mt-2 mb-4 ms-1 justify-content-end custom-viewblog-published">
           <p className="col-4 me-2">
             published on <b>{blogs?.createdAt?.split('-')[2].split('T')[0]+' '+Months[Number(blogs?.createdAt?.split('-')[1])-1]+' '+ blogs?.createdAt?.split('-')[0]}</b>
           </p>
         </div>
         <div className="row mt-4 custom-viewblog-image">
           <img
             src={blogs.imgURL}
             alt=""
           />
         </div>
         <div className="row mt-5 custom-viewblog-para">
           <div>
           <div dangerouslySetInnerHTML={{__html:blogs.paragragh}}>
           </div>
           
           </div>
         </div>
         <div className="row mt-4 mb-3 ms-1 justify-content-center custom-viewblog-published">
           <h6 className="col-12">
             Written by <span style={{ color: "black" }}>{user?.name}</span>
           </h6>
         </div>
       </div>
     </div>
     <div className="row custom-footer-page">
       <Footer />
     </div>
   </div>
    }
   
    </>
  );
};

export default ViewBlog;
