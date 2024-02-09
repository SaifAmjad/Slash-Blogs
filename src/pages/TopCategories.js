import React, { useContext } from "react";
import BlogContext from "../context/BlogContext";
import { Link } from "react-router-dom";


const TopCategories = ({ limit }) => {

  const context=useContext(BlogContext);
  const{BlogCategories}=context;

 

  let listIndex;

  if (limit) {
    listIndex = limit;
  } else {
    listIndex = BlogCategories.length;
  }

  return (
    <div>
      <div className="row custom-category-mobile">
        {BlogCategories.map((data, index) => {
          if (index < listIndex) {
            return (
              <Link to={`/category/${data.name}`} key={index} className="col-3 mt-4" > 
              <div className="" >
                <div
                  className="card custom-category-card"
                  style={{ height: "10pc" }}
                >
                  <img
                    src={data.src}
                    className="card-img"
                    alt="..."
                    style={{ height: "10pc" }}
                  />
                  <div className="card-img-overlay">
                    <h5 className="card-title">{data.name}</h5>
                  </div>
                </div>
              </div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

export default TopCategories;
