import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedTodos } from "./api/todos";
const PaginatedTodos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const skip = (currentPage - 1) * limit;

  const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
    queryKey: ["Todos", { page: currentPage }],
    placeholderData: (prev) => prev, // allows you oldData cache and new data shows immediately.
    queryFn: () => getPaginatedTodos(limit, skip),
  });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  if (isLoading) return <p>Loading Todos......</p>;
  if (isError) return <p>{error.message}</p>;

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const pageLimit = 5;
  const numberOfPages = () => {
    const halfRange = Math.floor(pageLimit / 2); // base value: 2
    let start = Math.max(currentPage - halfRange, 1); // base value: 1
    let end = Math.min(start + pageLimit + 1, totalPages); //1 + 5 + 1, totalPage, base value: totalPages

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <>
      <h2>Paginated Todos</h2>
      {isPlaceholderData && "Previous Data"}
      {data.todos.map((todo) => (
        <div key={todo.id}>
          <h4>
            {todo.id}. {todo.todo} | Status: {todo.completed ? "✔" : "❌"}
          </h4>
        </div>
      ))}
      <hr />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          Page {currentPage} out of {totalPages}
        </span>
        <span>Total: {data.total}</span>
      </div>
      <hr />
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      {numberOfPages().map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </>
  );
};
export default PaginatedTodos;
