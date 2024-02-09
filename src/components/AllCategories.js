import React from 'react'
import TopCategories from '../pages/TopCategories'
import Footer from '../pages/Footer'
import {Link} from "react-router-dom";

const AllCategories = () => {
  return (
    <div className='container-fluid'>
        <div className="container mt-4 custom-allCat-mainDiv">
          <div className="row d-flex">
         <h3 className="col-11">Categories</h3>
         <Link to="/" type="button" className="btn btn-outline-dark col align-self-end me-3 custom-allCat-backBtn">Back</Link>
          </div>
            <TopCategories/>
        </div>
       
    <div className="row custom-footer-page">
      <Footer/> 
    </div>
        
      
    </div>
  )
}

export default AllCategories
