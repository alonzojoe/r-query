import { useEffect, useState } from "react";
import "./App.css";
import api from "./api";
function App() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await api.get("/posts");
    const posts = await response.data.posts;
    setData(posts);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>React Query</h1>
      <div>
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </>
  );
}

export default App;
