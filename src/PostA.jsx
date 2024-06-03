import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";

const POST_LIMIT = 5;

const PostB = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["posts", "A", { limit: POST_LIMIT }],
    queryFn: () => getPosts(2000, POST_LIMIT),
  });

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      {data &&
        data.map((post) => (
          <div key={post.id}>
            <h1>
              {post.id} {post.title}
            </h1>
            <p>{post.body}</p>
          </div>
        ))}
    </>
  );
};

export default PostB;
