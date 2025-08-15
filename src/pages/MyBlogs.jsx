import React, { useEffect, useState } from "react";
import BlogCards from "../components/UI/BlogCards";
import { IoArrowBack } from "react-icons/io5";
import { getMyBlogs } from "../services/Blogs";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const navigate=useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getMyBlogs();
        console.log("blogs", data);
        if(data.success){
          setBlogs([...data.blog]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  const handleArrowBack=()=>{
    navigate(-1);
  }

  return (
    <div className="px-16 py-9">
      <div className="flex items-center gap-x-2.5">
        <IoArrowBack className="text-2xl cursor-pointer" onClick={handleArrowBack} />
        <h1 className="text-2xl font-semibold">My Blogs</h1>
      </div>

      <div className="grid sm:grid-cols-3 gap-x-7 gap-y-6 mt-8">
        {blogs.length > 0 &&
          blogs.map((blog) => (
            <BlogCards
              id={blog._id}
              title={blog.title}
              paragragh={blog.paragragh}
              imgUrl={blog.imgURL}
              createdAt={blog.createdAt}
              owner={blog.owner}
            />
          ))}
      </div>
    </div>
  );
};

export default MyBlogs;
