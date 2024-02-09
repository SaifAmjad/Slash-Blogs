import React, { useContext, useEffect, useRef, useState } from "react";
import Banner from "../pages/Banner";
import SideBar from "../pages/SideBar";
import TopCategories from "../pages/TopCategories";
import Blogs from "../pages/Blogs";
import{MdChevronLeft,MdChevronRight} from 'react-icons/md'
import TodaysPick from "../pages/TodaysPick";
import Footer from "../pages/Footer";
import BlogContext from "../context/BlogContext";


const Home = () => {

  const context=useContext(BlogContext);
  const{getAllBlogs,createBlog,getSingleBlog}=context;

  const slideRef=useRef(null);
  let[value,setValue]=useState(0);

  const clickSlideRight=()=>{
    slideRef.current.scrollLeft=slideRef.current.scrollLeft +500;
    setValue(value+1);
  }

  const clickSlideLeft=()=>{
    slideRef.current.scrollLeft=slideRef.current.scrollLeft -500;
    setValue(value-1);
  }

  return (
    <div className="container-fluid">
      <Banner />

      <div className="row mt-4">
        <div className="col-3 custom-sideBar-mainDiv">
          <SideBar />
        </div>

        <div className="col-9 custom-category-mobParentDiv">
        <h3>Top Categories</h3>
          <TopCategories limit={5} />
        </div>
      </div>
       
      <h3 style={{}} className="custom-recentBlogsSlide-h3Tag">Recent Blogs</h3>
      <MdChevronLeft onClick={clickSlideLeft} hidden={value===0?true:false} className="bg-white custom-mdLeft-arrow" />
      <div id="slideref" ref={slideRef} className="row custom-blogs-slide">
       <Blogs/>
      </div>
      <MdChevronRight onClick={clickSlideRight} hidden={value===3?true:false} className="bg-white custom-mdRight-arrow"/>
    
    <div id="today-pick" className="row custom-today-pick">
      <TodaysPick/>
    </div>

    <div className="row custom-footer-page">
      <Footer/> 
    </div>


    
    </div>
  );
};

export default Home;
