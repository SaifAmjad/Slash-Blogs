const host='https://slash-blog-backend.vercel.app'
// const host = "http://localhost:3000";

const getAllBlogs = async (page, search) => {
  let searchKey = "";
  if (search) {
    searchKey = search;
  }
  try {
    const res = await fetch(
      `${host}/api/v1/blogs?page=${page}&search=${searchKey}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getSingleBlog = async (id) => {
  try {
    const res = await fetch(`${host}/api/v1/blogs/${id}`);
    const data = await res.json();
    return { owner: data.blog.owner, blog: data.blog };
  } catch (error) {
    console.log(error);
  }
};

const getMyBlogs = async () => {
  try {
    const res = await fetch(`${host}/api/v1/blogs/myblogs`, {
      mode: "cors",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const editBlog = async (id, title, imgURL, paragragh, category) => {
  try {
    const res = await fetch(`${host}/api/v1/blogs/${id}`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, imgURL, paragragh, category }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteBlog = async (id) => {
  try {
    const res = await fetch(`${host}/api/v1/blogs/${id}`, {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createBlog = async (title, imgURL, paragragh, category) => {
  try {
    const res = await fetch(`${host}/api/v1/blogs`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, imgURL, paragragh, category }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const insertImage = async (Formdata) => {
  try {
    const res = await fetch(`${host}/api/v1/images`, {
      method: "POST",
      mode: "cors",
      body: Formdata,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (id) => {
  try {
    const res = await fetch(`${host}/api/v1/auth/user/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllBlogs,
  getSingleBlog,
  getMyBlogs,
  editBlog,
  deleteBlog,
  getUser,
  createBlog,
  insertImage,
};
