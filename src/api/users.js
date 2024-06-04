import api from "./index";

export const getUser = async (userId) => {
  return await api.get(`/users/${userId}`).then((res) => res.data);

  // const response = await new Promise((resolve, reject) => {
  //   setTimeout(async () => {
  //     try {
  //       const res = await api.get(`/users/${userId}`);
  //       resolve(res);
  //     } catch (error) {
  //       reject(error);
  //     }
  //   }, interval);
  // });

  // return response.data;
};
