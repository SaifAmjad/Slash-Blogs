import React, { useEffect, useState } from "react";
import BlogPage from "../components/ViewBlog/BlogPage";
import RelatedBlogs from "../components/ViewBlog/RelatedBlogs";
import { getSingleBlog } from "../services/Blogs";
import { useParams } from "react-router-dom";

const ViewBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    owner: "",
    created: "",
    para: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const handleClick = async () => {
      try {
        const response = await getSingleBlog(id);
        if (response) {
          setBlog({
            title: response.blog.title,
            owner: response.blog.owner,
            created: response.blog.createdAt,
            para: response.blog.paragragh,
          });
        }
       
      } catch (error) {
        console.log(error);
      }
    };

    handleClick();
  }, [id]);


  return (
    <div>
      <BlogPage
        title={blog.title}
        owner={blog.owner}
        created={blog.created}
        para={blog.para}
      />

      <RelatedBlogs />
    </div>
  );
};

export default ViewBlog;
