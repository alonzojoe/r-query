import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";

const POST_LIMIT = 5;

const PostA = () => {
  const postQuery = useQuery({
    queryKey: ["posts", "A", { limit: POST_LIMIT }],
    queryFn: () => getPosts(2000, POST_LIMIT),
  });

  if (postQuery.isLoading) return <p>Loading....</p>;
  if (postQuery.isError) return <p>{postQuery.error.message}</p>;

  return (
    <>
      {postQuery.data.map((post) => (
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

export default PostA;
