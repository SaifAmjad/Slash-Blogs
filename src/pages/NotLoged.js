import React from 'react'
import BlogsCardLoading from './BlogsCardLoading'
import { Link } from 'react-router-dom'


const NotLoged = () => {
  return (
    <>
    <div className="popup-container">
      <div className="popup">
        <h2>Not Signed in</h2>
        <p>Login or Signup to continue</p>
        <Link to={'/login/tab1'} className="btn btn-success">Log In</Link>
        <Link to={'/login/tab2'} className="btn btn-outline-success ">Sign Up</Link>
      </div>
    </div>
    </>
  )
}

export default NotLoged
