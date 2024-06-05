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
    onSuccess: (data, variables, context) => {
      // console.log("data", data); //response data from api
      console.log("context", context); //return data in onMutate
      queryClient.setQueryData(["posts", data.id], data); //manually updating the cache
      queryClient.invalidateQueries(["posts"], { exact: true }); //exact true is used for invalidating exact queryKey
      setCurrentPage(<Posts />);
    },
    //runs first than onSuccess
    onMutate: (variables) => {
      return variables;
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
