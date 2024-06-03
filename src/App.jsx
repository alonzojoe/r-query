import { useQuery, useMutation } from "@tanstack/react-query";
import "./App.css";
import api from "./api";

const fetchPosts = async (interval) => {
  const response = await new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const res = await api.get("/posts");
        resolve(res);
      } catch (error) {
        console.log("error", error);
        reject(error);
      }
    }, interval);
  });

  console.log("API Response:", response);
  return response.data.posts;
};

function App() {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(2000),
  });

  if (postQuery.isLoading) return <p>Loading...</p>;
  if (postQuery.isError)
    return <pre>{JSON.stringify(postQuery.error.message)}</pre>;

  return (
    <>
      <h1>React Query</h1>
      <div>
        {postQuery.data.map((post) => (
          <pre key={post.id}>{JSON.stringify(post)}</pre>
        ))}
      </div>
    </>
  );
}

export default App;
