import { useState } from "react";
import Posts from "./Posts";
import PostA from "./PostA";
import PostB from "./PostB";
import Post from "./Post";
import CreatePost from "./CreatePost";
import PaginatedTodos from "./PaginatedTodos";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState(<Posts />);
  const [id, setId] = useState(0);

  const getSinglePost = () => {
    setId((prevId) => {
      const newId = prevId + 1;
      setCurrentPage(<Post id={newId} />);
      return newId;
    });
  };

  return (
    <>
      <button onClick={() => setCurrentPage(<Posts />)}>All Posts</button>
      <button onClick={() => setCurrentPage(<PostA />)}>Post A</button>
      <button onClick={() => setCurrentPage(<PostB />)}>Post B</button>
      <button onClick={getSinglePost}>Single Post</button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        Create Post
      </button>
      <button onClick={() => setCurrentPage(<PaginatedTodos />)}>
        Paginated Todos
      </button>
      <hr />
      {currentPage}
    </>
  );
}

export default App;
