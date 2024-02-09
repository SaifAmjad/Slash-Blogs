import React, { useEffect, useContext, useState, useRef } from "react";
import BlogContext from "../context/BlogContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Footer from "../pages/Footer";
import { useNavigate } from "react-router-dom";
import WriteBlogLoading from "../pages/WriteBlogLoading";
import Cookies from "js-cookie";
import NotLoged from "../pages/NotLoged";



const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [img, setImg] = useState(null);
  const [category, setCategory] = useState("");
  const [timeout, setTimeOut] = useState(false);

  const cookie=Cookies.get('authToken');

  const navigate=useNavigate();

  const imgRef = useRef(null);
  const context = useContext(BlogContext);
  const { blogs, insertImage, createBlog, BlogCategories } = context;

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        ["blockquote", "code-block"],
        [{ header: [2, 3, 4, 5, false] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
    },
  };

  const handleclick = async () => {
    try {
      if(!title || !img || !value || !category){
        alert('Input all fields');
        return;
      }
      
      const res = await createBlog(title, img, value, category);
      if (res.success) {
        alert("Blog Published");
      }
      navigate('/myBlogs')
    } catch (error) {
      console.log(error)
    }
  };

  const handleClickImage = async (e) => {
    try {
      const formData = new FormData();
      formData.append("img", imgRef.current.files[0]);
      const imgUrl = await insertImage(formData);
      if (imgUrl.success) {
        setImg(imgUrl.url);
        setTimeOut(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTimeOut(false);
    }, 4000);

    return () => clearTimeout(timeOut);
  }, [timeout]);

  return (
    <>
    {
      !cookie?<><WriteBlogLoading/><NotLoged/></>:
      <>
      {timeout ? (
        <div className="alert alert-success" role="alert">
          Image uploaded successfully
        </div>
      ) : (
        ""
      )}
      <div className="container-fluid custom-writeblog-mobDiv">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-9 rounded rounded-5 bg-light mt-4 custom-writeblog-parentdiv">
              <div className="row">
                <div className="mb-2 d-flex justify-content-center">
                  <img
                    id="selectedImage"
                    src={
                      img
                        ? img
                        : "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                    }
                    alt="example placeholder"
                    style={{ width: "400px", height: "150px" }}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <div className="btn btn-success btn-rounded rounded-5 mb-4">
                    <label className="form-label text-white m-1" htmlFor="customFile1">
                      Choose Image
                    </label>
                    <input
                      ref={imgRef}
                      type="file"
                      className="form-control d-none"
                      id="customFile1"
                      onChange={handleClickImage}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Title
                  </span>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    placeholder="Your Blog's title"
                    aria-label="title"
                    aria-describedby="basic-addon1"
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="inputGroupSelect01">
                    Category
                  </label>
                  <select required className="form-select" id="inputGroupSelect01" value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option>Choose Category...</option>
                    {BlogCategories.map((data, index) => (
                      <option key={index} value={data.name}>{data.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row">
                <ReactQuill
                className="mb-2"
                  theme="snow"
                  value={value}
                  onChange={setValue}
                  modules={modules}
                  style={{ height: "17.5pc" }}
                />
              </div>

              <div className="row justify-content-end">
              <input className="btn btn-success col-2 rounded-5 me-4 mt-5" type="submit" value="Submit" onClick={handleclick}/>
              </div>
            </div>
          </div>

          
        </div>

        <div className="row custom-footer-page">
          <Footer />
        </div>
      </div>
      </>
      
    }
      
    </>
  );
};

export default WriteBlog;
