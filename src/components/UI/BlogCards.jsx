import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../services/Blogs";

const BlogCards = ({ id, title, paragragh, imgUrl, createdAt, owner }) => {
  const[user,setUser]=useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {

        const response = await getUser(owner);
        
        if(response.success){          
          setUser(response.user.name);
        }
      
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [owner]);

  return (
    <>
      <article className="group">
        <img
          alt=""
          src={imgUrl}
          className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%] dark:shadow-gray-700/25"
        />

        <div className="p-4">
          <Link to={`/blog/${id}`}>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
          </Link>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
            {paragragh.replace(/<[^>]*>?/gm, "")}
          </p>

          <h1 class=" mt-2 just-another-hand-light text-lg flex items-center gap-x-1 text-pink-500">
            {user}{" "}
            <div className="h-1.5 w-1.5 mt-0.5 bg-pink-500 rounded-full"></div>{" "}
            {createdAt.split("T")[0]}
          </h1>
        </div>
      </article>
    </>
  );
};

export default BlogCards;
