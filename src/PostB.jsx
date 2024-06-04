import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";

const POST_LIMIT = 10;

const PostB = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["posts", "B", { limit: POST_LIMIT }],
    queryFn: () => getPosts(POST_LIMIT),
    retry: 2,
    // staleTime: 1000,
    // refetchInterval: 1000,
  });

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      {data &&
        data.map((post) => (
          <div key={post.id}>
            <h1>
              {post.id}. {post.title}
            </h1>
            <p>{post.body}</p>
          </div>
        ))}
    </>
  );
};

export default PostB;
