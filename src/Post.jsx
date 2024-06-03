import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "./api/posts";
const Post = ({ id }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(1500, id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      {data && (
        <div>
          <h1>
            {data.id}. {data.title}
          </h1>
          <p>{data.body}</p>
        </div>
      )}
    </>
  );
};

export default Post;
