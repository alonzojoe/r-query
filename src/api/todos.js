import api from "./index";

export const getPaginatedTodos = async (limit, skip) => {
  return api
    .get(`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`)
    .then((res) => res.data);
};
