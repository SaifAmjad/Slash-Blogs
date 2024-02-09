import React from "react";
import {Link} from "react-router-dom";


const SideBar = () => {
  return (
    <>
      <nav className="nav flex-column custom-sidebar-nav">
        <Link className="nav-link" aria-current="page" to="/categories">
          All Categories
        </Link>
        <Link className="nav-link" to="/myBlogs">
          My Blogs
        </Link>
        <a className="nav-link" href="#today-pick">
          Today's Pick
        </a>
        <a className="nav-link" href="#about-us">
          Contact Us
        </a>
        <div>
        <Link to={'/writeBlog'} type="button" className="btn btn-success">Write Blog</Link>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
