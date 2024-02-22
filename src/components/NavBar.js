import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie"; 

const NavBar = ({setHide}) => {
    const cookie=Cookies.get('token');

    const navigate=useNavigate();

    const logout=()=>{
        const confirm=window.confirm('Are you sure to logOut');
        if(confirm){
            Cookies.remove('authToken');
            navigate('/');
        }   
    }



  return (
    <>
    <div className=" container-fluid">
    <div className="row custom-navbar">
            <div className="col-10 mt-3 custom-navbar-tagDiv ">
                <img style={{height:"45px",marginLeft:"20px"}} src="https://img.freepik.com/premium-photo/credit-card-laptop-computer_956369-6948.jpg?w=740" alt="" />
                <h3 className='custom-slash-tagline'>Slash</h3>
            </div>

            <div className="col mt-3 ms-2 navbar-top-btns">
                {cookie?<button onClick={logout} type="button" className="btn btn-outline-danger px-3 py-2 ms-5">Logout</button>:
               <> <Link to={'/login/tab1'} onClick={()=>{setHide(true)}} className="custom-login-btn text-decoration-none">Log In</Link>
                <Link to={'/login/tab2'} onClick={()=>{setHide(true)}} type="button" className="btn btn-outline-success">Sign Up</Link></>}
            </div>
        </div>
    </div>

    <div className="container-fluid custom-navbar-stick">
        <div className="row bg-white" >
            <div className="col-7 custom-navbar-spaceDiv"></div>
            <div className="col custon-navbar-options-div">
                <ul className='custom-navbar-options'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/recentBlogs">Recent Blogs</Link></li>
                    <li><Link to="/writeBlog">Write Blog</Link></li>
                    <li><a href="#about-us">About Us</a></li>
                </ul>
            </div>

        </div>
        </div>
      
    </>
  )
}

export default NavBar
