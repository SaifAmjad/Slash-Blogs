import React, { useEffect, useState } from "react";
import { getSingleBlog } from "../../services/Blogs";
import { Link } from "react-router-dom";

const CTA = () => {
  const [blog, setBlog] = useState({
    title: "",
    para: "",
    img: "",
    id: "",
  });

  useEffect(() => {
    const handleClick = async () => {
      try {
        const response = await getSingleBlog("65c5f86fa5728eb08ed53cf8");
        if (response) {
          setBlog({
            title: response.blog.title,
            para: response.blog.paragragh,
            img: response.blog.imgURL,
            id: response.blog._id,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleClick();
  }, []);

  return (
    <div className="h-full">
      <Link
        to={`/blog/${'65c5f86fa5728eb08ed53cf8'}`}
        className="group relative block bg-black rounded-4xl h-[90vh] overflow-hidden"
      >
        <img
          alt=""
          src={blog.img}
          className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
        />
        <div className="h-full flex flex-col justify-between pr-52">
          <div className="relative p-4 sm:p-6 lg:p-8">
            <p className="just-another-hand-regular text-xl   tracking-widest text-pink-500 uppercase">
              Featured
            </p>

            <p className="text-xl font-bold text-white sm:text-2xl">
              {blog.title}
            </p>
          </div>

          <div className="mb-8 pr-96 pl-10">
            <div>
              <div className="translate-y-8  transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <p
                  className="text-sm text-white line-clamp-5"
                  dangerouslySetInnerHTML={{ __html: blog.para }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CTA;
