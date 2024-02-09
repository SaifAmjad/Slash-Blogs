import React, { useContext, useEffect, useState } from "react";
import BlogContext from "../context/BlogContext";
import Footer from "../pages/Footer";
import {Link, Navigate, useNavigate} from "react-router-dom";
import BlogsCardLoading from "../pages/BlogsCardLoading";
import NotLoged from "../pages/NotLoged";
import Cookies from "js-cookie";
import NoBlogsToShow from "../pages/NoBlogsToShow";



const MyBlogs = () => {

  const context = useContext(BlogContext);
  const { blogs,deleteBlog, myBlogs } = context;

  let[fetchBlogs,setFetchBlogs]=useState([]);
  const[loading,setLoading]=useState(true);

  const navigate=useNavigate();


  const cookie=Cookies.get('authToken')
  console.log(cookie);
  

  const deleteClick=async(id)=>{
    try {
      const confirm=window.confirm('Are you sure you want to delete this blog?');

      if(confirm){

        const res=await deleteBlog(id);

        if(res.success) {
          alert('Blog delete successfully');
          navigate('/myBlogs');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(() => {
    let mounted=true;

    const fetchData=async()=>{
      try {
        const newBlogs=await myBlogs();
        console.log(newBlogs);
        if(newBlogs.success){
          setLoading(false);
        }
        if(mounted){
          setFetchBlogs(newBlogs.blog);
        }
        console.log(newBlogs);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    return ()=> mounted=false
   
  }, []);

  return (
    <>
    {!cookie?<>< BlogsCardLoading/> <NotLoged/></>  :
    <div className="container-fluid">
      <div className="container custom-myblogs-mobmainDiv">

      <div className="row me-2 custom-myblogs-headerRow">
      <h3 className="mt-4 col-11">My Blogs</h3>
      <Link to="/" type="button" className="btn btn-outline-dark col align-self-end me-3">Back</Link>
      </div>
        
        <div className="row ms-3 mb-5 custom-myblogs-mobChild custom-myblogs-DesktopDiv">
    {  
      loading?<BlogsCardLoading/>:  Array.isArray(fetchBlogs) &&
        fetchBlogs.map((data) => {
          return (
            <Link
            to={`/viewblog/${data._id}`}
              key={data._id}
              className="col-1 me-2 mt-4 text-decoration-none"
              style={{ width: "16.7rem" }}
            >
              <div
                className="card  custom-blog-card"
                style={{ width: "15rem" }}
              >
                <img src={data.imgURL} className="card-img-top" alt="..." style={{height:"9.5pc"}}/>
                <div className="card-body">
                  <h5 className="card-title">
                    {data.title && JSON.stringify(data.title).slice(0, 30)}
                    {JSON.stringify(data.title).length > 40 ? "..." : ""}
                  </h5>
                  <div className="custom-myBlogs-icons">
                  <Link to={`/editblog/${data._id}`} className="fa-regular fa-pen-to-square" style={{color:"black"}}></Link>
                  <i className="fa-solid fa-eraser" onClick={()=>{deleteClick(data._id)}}></i>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      }
        </div>
        </div>
        <div className="row custom-footer-page">
      <Footer/> 
    </div>
    </div> 
    }
    </>

    
  );
};

export default MyBlogs;
