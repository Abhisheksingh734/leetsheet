import { useEffect, useState } from "react";
import React from "react";
import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";

const App = () => {
  const [taskData, setTaskData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://sheetdb.io/api/v1/369w89f027n82?limit=20&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTaskData((prevData) => [...prevData, ...data]);
      console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 text-gray-300 ">
      <Header />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">
          LeetSheet Task Tracker
        </h1>
        <Card data={taskData} />
        <div className="flex justify-center mt-4">
          <button
            onClick={handleNextPage}
            disabled={loading}
            className={`px-4 py-2 bg-orange-500 text-white rounded ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
            }`}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
