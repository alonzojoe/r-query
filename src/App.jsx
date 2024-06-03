import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "./App.css";
import api from "./api";

const LOGGED_USER_ID = 7;

const createNewPost = async (interval, postTitle) => {
  const response = await new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const res = await api.post("/posts/add", {
          title: postTitle,
          userId: LOGGED_USER_ID,
        });
        resolve(res);
      } catch (error) {
        reject(error);
      }
    }, interval);
  });

  console.log("new post created", response.data);
  return response.data;
};

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
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(2000),
    retry: 2,
  });

  const newPostMutation = useMutation({
    mutationFn: (title) => createNewPost(3000, title),
    onSuccess: () => queryClient.invalidateQueries(["posts"]), //after mutationFn success it will refetch the data from api using onSuccess
  });

  if (postQuery.isLoading) return <p>Loading...</p>;
  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error.message)}</pre>;
  }

  return (
    <>
      <h1>React Query</h1>
      <button
        onClick={() => newPostMutation.mutate("New Post using useMutate()")}
        disabled={newPostMutation.isPending}
      >
        {newPostMutation.isPending ? "Creating...." : "Create New Post"}
      </button>
      <div>
        {postQuery.data.map((post) => (
          <pre key={post.id}>{JSON.stringify(post)}</pre>
        ))}
      </div>
    </>
  );
}

export default App;
