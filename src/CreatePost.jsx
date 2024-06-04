import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "./api/posts";
import Posts from "./Posts";
const CreatePost = ({ setCurrentPage }) => {
  const queryClient = useQueryClient();

  const title = useRef(null);
  const body = useRef(null);

  const createPostMutation = useMutation({
    mutationFn: (title, body) => createPost({ title, body }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setCurrentPage(<Posts />);
    },
  });

  const submitFormHandler = (e) => {
    e.preventDefault();
    createPostMutation.mutate({
      title: title.current.value,
      body: body.current.value,
    });
  };

  return (
    <>
      {createPostMutation.isError &&
        JSON.stringify(createPostMutation.error.message)}
      <form onSubmit={submitFormHandler}>
        <h4>Create New Post</h4>
        <div>
          <label htmlFor="title">Title:</label>
          <input ref={title} type="text" id="title" />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <input ref={body} type="text" id="body" />
        </div>
        <button disabled={createPostMutation.isPending}>
          {createPostMutation.isPending ? "Saving....." : "Save"}
        </button>
      </form>
    </>
  );
};

export default CreatePost;
