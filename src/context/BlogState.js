import React, { useState } from 'react'
import BlogContext from './BlogContext'
import Cookies from "js-cookie";    


const BlogState = (props) => {
    const host='https://slash.fly.dev'
    const[blogs,setBlogs]=useState([]);
    const[totalBlogs,setTotalBlogs]=useState();
    const[success,setSuccess]=useState(false); 

     const token=Cookies.get('token');
   

    const getAllBlogs=async(page)=>{
        try {
            const res=await fetch(`${host}/api/v1/blogs?page=${page}`);
            const data=await res.json(); 
            setBlogs(data.blog)
            setTotalBlogs(data.blogCount);
            if(data.success){
              setSuccess(true);
            }
            return data.blog
        } catch (error) {
            console.log(error);
        }
    }  

    const getCategoryBlogs=async()=>{
      try {
          const res=await fetch(`${host}/api/v1/blogs/categoryblogs`);
          const data=await res.json();
          setBlogs(data.blog)
          if(data.success){
            setSuccess(true);
          }
          return data.blog
      } catch (error) {
          console.log(error);
      }
  } 



    const createBlog=async(title,imgURL,paragragh,category)=>{
        try {
            const res=await fetch(`${host}/api/v1/blogs`, {
                method: "POST", 
                mode: "cors", 
                credentials: 'include',
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": token
                },
                body: JSON.stringify({title,imgURL,paragragh,category}), 
              });
            const data= await res.json();
            return data; 
        } catch (error) {
            console.log(error);
        }

    }

    const getSingleBlog=async(id)=>{
        try {
            const res=await fetch(`${host}/api/v1/blogs/${id}`);
            const data=await res.json();
            setBlogs(data.blog)
            return {owner:data.blog.owner,blog:data.blog};
        } catch (error) {
            console.log(error);
        }
    }

    const myBlogs=async()=>{
        try {
            const res=await fetch(`${host}/api/v1/blogs/myblogs`,{
              mode: "cors", 
              credentials: 'include',
              headers: {
                  "Authorization": token,
                }
            });
            const data=await res.json();
            console.log(data)
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const editBlog=async(id,title,imgURL,paragragh,category)=>{
        try {
            const res=await fetch(`${host}/api/v1/blogs/${id}`,{
                method: "PUT", 
                mode: "cors", 
                credentials: 'include',
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": token
                },
                body: JSON.stringify({title,imgURL,paragragh,category}),   
            });
            const data=await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteBlog=async(id)=>{
        try {
            const res=await fetch(`${host}/api/v1/blogs/${id}`,{
                method: "DELETE", 
                credentials: 'include',
                mode: "cors", 
            });
            const data=await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const getUser=async(id)=>{
      try {
          const res=await fetch(`${host}/api/v1/auth/user/${id}`)
          const data=await res.json();
          return data;
      } catch (error) {
          console.log(error);
      }
  }

  const insertImage=async(Formdata)=>{
    try {
      const res=await fetch(`${host}/api/v1/images`,{
        method: "POST", 
        mode: "cors", 
        body:Formdata
      })
      const data=await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

    const BlogCategories = [
        {
          name: "Technology Trends",
          src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaG5vbG9neSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D",
        },
        {
          name: "Travel Destinations",
          src: "https://img.freepik.com/free-photo/backpacker-standing-sunrise-viewpoint-ja-bo-village-mae-hong-son-province-thailand_335224-1356.jpg?size=626&ext=jpg&ga=GA1.1.286214136.1704564082&semt=sph",
        },
        {
          name: "Fashion and Style",
          src: "https://img.freepik.com/free-photo/girl-with-backpack-sunset-generative-al_169016-28612.jpg?size=626&ext=jpg&ga=GA1.1.286214136.1704564082&semt=sph",
        },
        {
          name: "Home Decor and DIY",
          src: "https://img.freepik.com/free-photo/living-room-with-blue-sofa-gold-coffee-table_123827-23877.jpg?size=626&ext=jpg&ga=GA1.1.286214136.1704564082&semt=ais",
        },
        {
          name: "Food and Cooking", 
          src: "https://img.freepik.com/free-photo/pretty-little-girl-is-tossing-vegetables-pan-dark-photo-studio_613910-13022.jpg?size=626&ext=jpg&ga=GA1.1.286214136.1704564082&semt=ais",
        },
        {
          name: "Career Development",
          src: "https://img.freepik.com/free-photo/business-people-rushing-towards-success_53876-65643.jpg?size=626&ext=jpg&ga=GA1.1.286214136.1704564082&semt=ais",
        },
        {
          name: "Books",
          src: "https://img.freepik.com/premium-photo/book-library-with-old-open-textbook-stack-piles-literature-text-archive-reading-desk_779468-5826.jpg?size=626&ext=jpg&ga=GA1.1.286214136.1704564082&semt=sph",
        },
        {
          name: "Fitness and Exercise",
          src: "https://img.freepik.com/premium-photo/gym-dumbbell-plank-people-focus-fitness-diet-body-health-goals-performance-wellness-commitment-workout-motivation-class-exercise-challenge-athlete-team-training-sports-club-floor_590464-106602.jpg?size=626&ext=jpg&ga=GA1.1.286214136.1704564082&semt=ais",
        },
        {
          name: "Movie and TV Show",
          src: "https://img.freepik.com/free-vector/open-air-cinema_23-2148657085.jpg?size=626&ext=jpg&ga=GA1.1.286214136.1704564082&semt=ais",
        },
        {
          name: "Health and Wellness",
          src: "https://img.freepik.com/free-photo/africa-humanitarian-aid-doctor-taking-care-patient_23-2149117843.jpg?size=626&ext=jpg&ga=GA1.1.286214136.1704564082&semt=sph",
        },
        {
          name: "Hobby and Crafts",
          src: "https://img.freepik.com/free-photo/paper-near-easter-eggs-willow-twigs-tablet-stationery_23-2148069412.jpg?size=626&ext=jpg&ga=GA1.1.286214136.1704564082&semt=ais",
        },
        {
          name: "Education and Learning",
          src: "https://img.freepik.com/free-vector/e-learning-isometric-concept_1284-16835.jpg?size=626&ext=jpg&ga=GA1.1.286214136.1704564082&semt=ais",
        },
        {
          name: "Sports",
          src: "https://img.freepik.com/free-photo/close-up-athlete-playing-soccer_23-2150845600.jpg?size=626&ext=jpg&ga=GA1.1.286214136.1704564082&semt=sph",
        },
      ];

  return (
    <BlogContext.Provider value={{blogs,setBlogs,getAllBlogs,getCategoryBlogs,createBlog,getSingleBlog,myBlogs,editBlog,deleteBlog,getUser,insertImage,success,host,BlogCategories,totalBlogs}}>
        {props.children}
    </BlogContext.Provider>
  )
}

export default BlogState;
