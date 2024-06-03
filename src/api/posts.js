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
