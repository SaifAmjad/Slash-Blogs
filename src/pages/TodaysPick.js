import React, { useContext, useEffect, useState } from "react";
import BlogContext from "../context/BlogContext";
import { Link } from "react-router-dom";


const TodaysPick = () => {

  const context = useContext(BlogContext);
  const { blogs,getSingleBlog } = context;
  const[blog,setBlog]=useState();


  useEffect(()=>{
    let mounted=true;
    const fetchData=async()=>{
      
      try {
        const newBlog=await getSingleBlog('65bc17e80c2ba496f822d0c8');
        if(mounted){
          setBlog(newBlog.blog)
        }
        console.log(newBlog);
      } catch (error) {
        console.log(error)
      }
    }

    fetchData();

    return ()=>{mounted=false}
  },[])

  const Months=['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec']

  return (
    <div className="container">
      <h2>Today's Pick</h2>
        <div className="row justify-content-center ">
          <div className="col-10 g-0" >
            <div className=" mb-3 mt-4 custom-todayPick-mainDiv">

              <div className="row">
            <div className=" col me-3 ms-2 mt-1 custom-todaypic-col-img" >
              <img src={blog?.imgURL} className="img-fluid rounded " alt="..." />
            </div>

            <div className=" card col">
              <div className="card-body mt-3">
                <h3 className="card-title mt-3">{blog?.title}</h3>
                <div className="card-text mt-3" dangerouslySetInnerHTML={{__html:blog?.paragragh.substring(0,130)+'...'}}>
               
                </div>
                <p className="card-text">
                  <small className="text-body-secondary">
                    published on {blog?.createdAt?.split('-')[2].split('T')[0]+' '+Months[Number(blog?.createdAt?.split('-')[1])-1]+' '+ blog?.createdAt?.split('-')[0]}
                  </small>
                </p>
                <Link to={`/viewblog/${blog?._id}`} type="button" className="btn btn-success">View Blog</Link>
              </div>
            </div>

          </div>
          </div>
          </div>
        </div>
    </div>
  );
};

export default TodaysPick;
