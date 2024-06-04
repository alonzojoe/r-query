import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "./api/posts";
import { getUser } from "./api/users";
const Post = ({ id }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });

  const userQuery = useQuery({
    queryKey: ["user", data?.userId],
    enabled: data?.userId != null,
    queryFn: () => getUser(data.userId),
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
          {userQuery.isLoading ? (
            "Loading User Data..."
          ) : userQuery.isError ? (
            `Error: ${userQuery.error.message}`
          ) : (
            <small>Created By: {userQuery.data.firstName}</small>
          )}
        </div>
      )}
    </>
  );
};

export default Post;
