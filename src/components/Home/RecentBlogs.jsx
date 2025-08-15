import React, { useEffect, useState } from "react";
import BlogCards from "../UI/BlogCards";
import SearchBar from "./SearchBar";
import { getAllBlogs } from "../../services/Blogs";
import PrimaryButton from "../UI/PrimaryButton";

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loadPage, setLoadPage] = useState(1);
  const [blogCount,setBlogCount]=useState(0);
  const [search,setSearch]=useState('')

  useEffect(() => {
    const handleGetBlogs = async () => {
      try {
        const response = await getAllBlogs(loadPage,search);
        if (response.success) {
          setBlogs(response.blog);
          setBlogCount(response.blogCount);
          console.log(response.blogCount);
          
         
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleGetBlogs();
  }, [loadPage,search]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Recent Blogs</h1>
        </div>

        <SearchBar setSearch={setSearch} />
      </div>

      <div className="grid mt-2 sm:mt-0 sm:grid-cols-3 gap-x-7 gap-y-6">
        {blogs.length > 0 &&
          blogs.map((blog) => (
            <>
              <BlogCards
                key={blog._id}
                id={blog._id}
                title={blog.title}
                paragragh={blog.paragragh}
                imgUrl={blog.imgURL}
                createdAt={blog.createdAt}
                owner={blog.owner}
              />
            </>
          ))}

       
      </div>
      <div className="w-full flex justify-center mt-5">
        <PrimaryButton disabled={blogCount>blogs.length?false:true} onclick={() => setLoadPage((prev) => prev + 1)}>
          Load More...
        </PrimaryButton>
      </div>
    </div>
  );
};

export default RecentBlogs;
