import React, { useEffect, useContext, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import SecondaryButton from "../components/UI/SecondaryButton";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "../utils/BlogSchema";
import { createBlog, insertImage } from "../services/Blogs";
import PrimaryAlert from "../components/UI/PrimaryAlert";

const WriteBlog = () => {
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogSchema),
  });

  const [timeout, setTimeOut] = useState(false);

  const imgRef = useRef(null);
  const [alert, setAlert] = useState({
    variant: "success",
    msg: "",
    state: false,
  });

  const modules = {
    toolbar: {
      container: "#custom-toolbar",
    },
  };

  const handleClickImage = async (e) => {
    try {
      const formData = new FormData();
      formData.append("img", imgRef.current.files[0]);
      const imgUrl = await insertImage(formData);
      if (imgUrl.success) {
        setImg(imgUrl.url);
        setValue("imgURL", imgUrl.url);
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

  const handleclick = async (data) => {
    setLoader(true);
    try {
      const res = await createBlog(data.title, data.imgURL, data.paragragh);

      if (res.success) {
        setLoader(false);
        setAlert({
          variant: "success",
          msg: "Blog published successfully",
          state: true,
        });
        navigate("/myBlogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (errors) => {
    console.log("Form validation failed:", errors);
  };

  return (
    <>
      <PrimaryAlert
        variant={alert.variant}
        msg={alert.msg}
        state={alert.state}
        setState={setAlert}
      />
      <form onSubmit={handleSubmit(handleclick, onError)}>
        <div className="sm:grid sm:grid-cols-[80%_20%] flex flex-col-reverse ">
          <div className=" sm:px-3 px-12 mt-10 sm:mt-0">
            <div className="flex justify-between items-center mb-2 border-b border-gray-400 pb-1">
              <div
                id="custom-toolbar"
                className="mb-2 flex justify-center sm:gap-x-9 gap-x-2 border-b"
              >
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-blockquote" />
                <button className="ql-code-block" />

                <select className="ql-header" defaultValue="">
                  <option value="2">H2</option>
                  <option value="3">H3</option>
                  <option value="4">H4</option>
                  <option value="5">H5</option>
                  <option value="">Normal</option>
                </select>

                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
                <button className="ql-link" />
                <button className="ql-clean" />
              </div>

              <SecondaryButton type="submit" loader={loader} disable={loader}>
                Post
              </SecondaryButton>
            </div>

            <div className="flex items-center gap-x-3 ml-3.5">
              <label className="block text-xl font-medium text-gray-600">
                Title:
              </label>
              <input
                type="text"
                {...register("title")}
                placeholder="Your Blog's title"
                className="block w-full text-lg font-semibold text-gray-600 placeholder:font-normal focus:outline-none focus:ring-0 focus:border-transparent"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Controller
                name="paragragh"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <ReactQuill
                    {...field}
                    theme="snow"
                    placeholder="Your blog content"
                    modules={modules}
                    className="mt-2 mb-2 border-none placeholder:font-normal text-gray-700 focus:border-none focus:outline-none shadow-none"
                    style={{
                      minHeight: "27.5pc",
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      color: "#364153",
                    }}
                  />
                )}
              />
              {errors.value && (
                <p className="text-red-500">{errors.paragragh.message}</p>
              )}
            </div>
          </div>

          <div className="border-l border-gray-300 sm:px-2.5 px-12 mt-10 sm:mt-0 ">
            <div className="flex justify-center sm:block">
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
            <div>
              <label
                className="form-label m-1 block text-xl font-medium text-gray-600"
                htmlFor="customFile1"
              >
                Display Image
              </label>
              <div>
                <label
                  htmlFor="customFile1"
                  className="cursor-pointer block px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-pink-700 transition"
                >
                  📁 Upload Image
                </label>

                <div className="text-sm text-gray-500">
                  {imgRef?.current?.files[0]?.name || "No file chosen"}
                </div>
              </div>

              <input
                type="file"
                id="customFile1"
                ref={(e) => {
                  imgRef.current = e;
                }}
                onChange={handleClickImage}
                required
                className="sr-only"
              />
              {errors.img && (
                <p className="text-red-500">{errors.imgURL.message}</p>
              )}
            </div>
          </div>

        </div>
      </form>
    </>
  );
};

export default WriteBlog;
