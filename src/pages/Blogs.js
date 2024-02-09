import React, { useContext, useEffect, useState } from "react";
import BlogContext from "../context/BlogContext";
import { Link } from "react-router-dom";
import BlogsCardLoading from "../pages/BlogsCardLoading";

const Blogs = () => {
  const context = useContext(BlogContext);
  const { blogs, success, getAllBlogs } = context;

  let [getBlogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
    
      try {
        const newBlogs = await getAllBlogs();
       
        if (success) {
          setLoading(false);
        }

        if (isMounted) {
          setBlogs(newBlogs);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [success]);

  return (
    <>
      {loading?<BlogsCardLoading/> : Array.isArray(getBlogs) &&
        getBlogs.map((data) => {
          return (
            <Link
              to={`/viewblog/${data._id}`}
              key={data._id}
              className="col me-1 mt-5"
              style={{ width: "16.7rem", textDecoration: "none" }}
            >
              <div
                className="card  custom-blog-card"
                style={{ width: "15rem" }}
              >
                <img
                  src={data.imgURL}
                  className="card-img-top"
                  alt="..."
                  style={{ height: "9.5pc" }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {data.title && JSON.stringify(data.title).slice(0, 30)}
                    {JSON.stringify(data.title).length > 40 ? "..." : ""}
                  </h5>
                </div>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default Blogs;
