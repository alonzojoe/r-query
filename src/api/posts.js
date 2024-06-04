import api from "./index";

const LOGGED_USER_ID = 7;

export const getPosts = async (limit) => {
  return await api.get(`/posts?limit=${limit}`).then((res) => res.data.posts);
};

export const getPostById = async (id) => {
  return await api.get(`/posts/${id}`).then((res) => res.data);
};

export const createPost = async (postDetails) => {
  return await api
    .post("/post/add", {
      title: postDetails.title,
      body: postDetails.body,
      userId: LOGGED_USER_ID,
    })
    .then((res) => res.data);
};
