import React, { useEffect, useState } from "react";
import { getUser } from "../../services/Blogs";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const BlogPage = ({ title, owner, created, para }) => {
  const[user,setUser]=useState('');
  
  const navigate=useNavigate()

  useEffect(()=>{

    const handleGetUser=async()=>{
      try {
        const response=await getUser(owner);
       
        if(response.success){
          setUser(response.user.name)
        }

         console.log('user',response);
        
      } catch (error) {
        console.log(error);
        
      }

    }

    handleGetUser();

  },[owner])

const handleArrowBack=()=>{
    navigate(-1);
  }


  return (
    <>
      
      <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="px-10 mb-6">
          <IoArrowBack className="text-2xl cursor-pointer" onClick={handleArrowBack} />
        </div>
        <div class="flex justify-between px-12 sm:px-4 mx-auto max-w-screen-xl ">
          
          <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header class="mb-4 lg:mb-6 not-format">
              <address class="flex items-center mb-6 not-italic">
                <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img
                    class="mr-4 w-16 h-16 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Jese Leos"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      class="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      {user}
                    </a>
                    {/* <p class="text-base text-gray-500 dark:text-gray-400">
                      Graphic Designer, educator & CEO Flowbite
                    </p> */}
                    <p class="text-base text-gray-500 dark:text-gray-400">
                      {/* <time
                        pubdate
                        datetime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        Feb. 8, 2022
                      </time> */}
                      {created.split("T")[0]}
                    </p>
                  </div>
                </div>
              </address>
              <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {title}
              </h1>
            </header>
            <div dangerouslySetInnerHTML={{ __html: para }} />
          </article>
        </div>
      </main>
    </>
  );
};

export default BlogPage;
