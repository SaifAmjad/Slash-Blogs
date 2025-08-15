import React, { useEffect, useState } from "react";
import { getSingleBlog, getUser } from "../../services/Blogs";
import { Link } from "react-router-dom";

const TodaysPick = () => {
  const [blog, setBlog] = useState({
    title: "",
    para: "",
    img: "",
    id: "",
    owner: "",
  });

  const [user, setUser] = useState("");

  useEffect(() => {
    const handleClick = async () => {
      try {
        const response = await getSingleBlog("65c5f4e7a5728eb08ed53caa");
        console.log(response);

        if (response) {
          setBlog({
            title: response.blog.title,
            para: response.blog.paragragh,
            img: response.blog.imgURL,
            id: response.blog._id,
            owner: response.blog.owner,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleClick();
  }, []);

  useEffect(() => {
    const handleGetUser = async (id) => {
      try {
        const response = await getUser(id);
        // console.log(response);

        if (response.success) {
          setUser(response.user.name);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleGetUser(blog.owner);
  }, [blog.owner]);

  return (
    <div>
      <section class="bg-white dark:bg-gray-900">
        <div class="container px-6 py-10 mx-auto">
          <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-2xl dark:text-white">
            Today's Pick
          </h1>

          <div class="mt-8 lg:-mx-6 lg:flex lg:items-center">
            <img
              class="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
              src={blog.img}
              alt=""
            />

            <div class="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
              {/* <p class="text-sm text-pink-500 uppercase">category</p> */}

              <a
                href="#"
                class="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white"
              >
                {blog.title}
              </a>

              <p
                class="mt-3 text-sm line-clamp-5 text-gray-500 dark:text-gray-300 md:text-sm"
                dangerouslySetInnerHTML={{ __html: blog.para }}
              ></p>

              <Link
                to={`/blog/${blog.id}`}
                class="inline-block mt-2 text-pink-500 underline hover:text-pink-400"
              >
                Read more
              </Link>

              <div class="flex items-center mt-6">
                <img
                  class="object-cover object-center w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                  alt=""
                />

                <div class="mx-4">
                  <h1 class="text-sm text-gray-700 dark:text-gray-200">
                    {user}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TodaysPick;
