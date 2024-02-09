import { useEffect, useState } from "react";
import "./App.css";
import "./Custom.css";
import AllCategories from "./components/AllCategories";
import CategoryBlogs from "./components/CategoryBlogs";
import Home from "./components/Home";
import Login from "./components/Login";
import MyBlogs from "./components/MyBlogs";
import NavBar from "./components/NavBar";
import RecentBlogs from "./components/RecentBlogs";
import ViewBlog from "./components/ViewBlog";
import WriteBlog from "./components/WriteBlog";
import BlogState from "./context/BlogState";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import EditBlog from "./components/EditBlog";


function App() {
  const[hide,setHide]=useState(false);


  useEffect(() => {
    const handleRouteChange = () => {
      if (window.location.pathname !== '/login/tab1' || window.location.pathname !== '/login/tab2') {
        setHide(false);
      }
    };

  
    window.addEventListener('popstate', handleRouteChange);

 
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
    
  }, []);


  return (
    <BlogState> 
      <Router>
        
        {hide===false && <NavBar setHide={setHide} />}
       
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/categories" element={<AllCategories/>} />
          <Route path="/recentBlogs" element={<RecentBlogs />} />
          <Route path="/writeBlog" element={<WriteBlog />} />
          <Route path="/myBlogs" element={<MyBlogs/>} />
          <Route path="/category/:id" element={<CategoryBlogs/>} />
          <Route path="/viewblog/:id" element={<ViewBlog/>} />
          <Route path="/editblog/:id" element={ <EditBlog/>} />
          <Route path="/login/:tab" element={<Login setHide={setHide}/>} />
        </Routes>
      </Router>
    </BlogState>
  );
}

export default App;
