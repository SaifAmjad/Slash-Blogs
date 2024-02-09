import React, { useContext, useEffect, useState } from "react";
import BlogContext from "../context/BlogContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../pages/Footer";
import BlogsCardLoading from "../pages/BlogsCardLoading";


const CategoryBlogs = () => {
  const context = useContext(BlogContext);
  const { success, getCategoryBlogs, totalBlogs } = context;

  const { id } = useParams();
  let [filterBlogs, setFilterBlogs] = useState([]);
  const[loading,setLoading]=useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      
      try {

        const newBlogs = await getCategoryBlogs();
        let arr = newBlogs.filter((data) => {
          return data.category === id;
        });
        
        if(success){
          setLoading(false);
        }
       
        if (isMounted) {
       
          setFilterBlogs(arr);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
    
  }, []);

  return (
    <>
    {
      loading?<BlogsCardLoading/>:
      <div className="container-fluid">
      <div className="container custom-categoryBlogs-mobMain">
        <div className="row mt-4">
          <h3 className="col-11">{id}</h3>
          <Link
            to="/categories"
            type="button"
            className="btn btn-outline-dark col align-self-end me-3"
          >
            Back
          </Link>
        </div>
        <div className="row custom-categoryBlogs-rowDiv">
          {filterBlogs &&
            filterBlogs.map((data) => {
              return (
                <Link
                  to={`/viewblog/${data._id}`}
                  key={data._id}
                  className="col-1 mt-3 mb-2 text-decoration-none"
                  style={{ width: "16.7rem" }}
                >
                  <div
                    className="card  custom-blog-card"
                    style={{ width: "15rem" }}
                  >
                    <img src={data.imgURL} className="card-img-top" alt="..." style={{height:"9.5pc"}} />
                    <div className="card-body">
                      <h5 className="card-title">
                        {data.title && JSON.stringify(data.title).slice(0, 30)}
                        {JSON.stringify(data.title)?.length > 40 ? "..." : ""}
                      </h5>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      <div className="row custom-footer-page">
        <Footer />
      </div>
    </div>
    }
    </>
    
  );
};

export default CategoryBlogs;
