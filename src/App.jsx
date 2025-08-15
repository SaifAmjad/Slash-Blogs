import "./App.css";
import Layout from "./components/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import MyBlogs from "./pages/MyBlogs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ViewBlog from "./pages/ViewBlog";
import WriteBlog from "./pages/WriteBlog";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/myblogs"
            element={
              <ProtectedRoutes>
                <MyBlogs />
              </ProtectedRoutes>
            }
          />
          <Route path="/blog/:id" element={<ViewBlog />} />
          <Route
            path="/writeblog"
            element={
              <ProtectedRoutes>
                <WriteBlog />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
