import api from "./index";

export const getPosts = async (interval, limit) => {
  const response = await new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const res = await api.get(`/posts?limit=${limit}`);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    }, interval);
  });

  return response.data.posts;
};

export const getPostById = async (interval, id) => {
  const response = await new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    }, interval);
  });

  return response.data;
};
