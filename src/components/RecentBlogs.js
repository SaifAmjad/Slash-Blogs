import React, { useContext, useEffect, useState } from "react";
import BlogContext from "../context/BlogContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Footer from "../pages/Footer";
import { Link } from "react-router-dom";



const RecentBlogs = () => {
  const context = useContext(BlogContext);
  const { blogs, getAllBlogs, totalBlogs } = context;

  let [allBlogs, setAllBlogs] = useState([]);
  let [page, setPage] = useState(1);

  const fetchMoreData = async () => {
    console.log('more')
    try {
      const newBlogs = await getAllBlogs(page + 1);
      console.log(newBlogs)
      setPage(page + 1);
      if(Array.isArray(newBlogs)){
        setAllBlogs((oldBlogs) => [...oldBlogs, ...newBlogs]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialBlogs = await getAllBlogs();
        setAllBlogs(initialBlogs);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
    
  }, []);

  

  return (
    <div className="container-fluid bg-white">
      <div className="container pb-1 custom-recentBlogs-mob">
        <div className="row">
        <h3 className="mt-4">Recent Blogs</h3>
        </div>
       
        <InfiniteScroll
          dataLength={allBlogs?.length}
          next={fetchMoreData}
          hasMore={allBlogs?.length !== totalBlogs}
          loader={<h4>Loading...</h4>}
          className="row ms-4 pb-4"
        >
          {Array.isArray(allBlogs) &&
            allBlogs.map((data) => {
              return (
                <Link
                  to={`/viewblog/${data._id}`}
                  key={data._id}
                  className="col-1 mt-3"
                  style={{ width: "16.7rem",textDecoration:"none" }}
                >
                  <div
                    className="card custom-blog-card"
                    style={{ width: "15.5rem" }}
                  >
                    <img src={data.imgURL} className="" alt="..." style={{height:"9.5pc"}} />
                    <div className="card-body">
                      <h5 className="">
                        {data.title && JSON.stringify(data.title).slice(0, 30)}
                        {JSON.stringify(data.title)?.length > 20 ? "..." : ""}
                      </h5>
                    </div>
                  </div>
                </Link>
              );
            })}
        </InfiniteScroll>
      </div>

      {/* <div className="row custom-footer-page">
        <Footer />
      </div> */}
    </div>
  );
};

export default RecentBlogs;
