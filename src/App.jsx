import { useState } from "react";
import Posts from "./Posts";
import PostA from "./PostA";
import PostB from "./PostB";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState(<Posts />);
  return (
    <>
      <button onClick={() => setCurrentPage(<Posts />)}>All Posts</button>
      <button onClick={() => setCurrentPage(<PostA />)}>Post A</button>
      <button onClick={() => setCurrentPage(<PostB />)}>Post B</button>
      <hr />
      {currentPage}
    </>
  );
}

export default App;
