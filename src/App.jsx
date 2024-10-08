import { useEffect, useState } from "react";
import React from "react";
import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";

const App = () => {
  const [taskData, setTaskData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async (offset) => {
    setLoading(true);
    try {
      console.log(`Fetching data starting at offset: ${offset}`);
      const response = await fetch(
        `https://sheetdb.io/api/v1/369w89f027n82?limit=50&offset=${offset}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched data:", data);

      if (data.length === 0) {
        console.log("No more data available.");
        return; // Exit if no new data
      }

      // Append new data logic
      setTaskData((prevData) => {
        const existingIds = new Set(
          prevData.map((item) => item.questionFrontendId)
        );
        const newData = data.filter(
          (item) => !existingIds.has(item.questionFrontendId)
        );
        return [...prevData, ...newData]; // Append only new items
      });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchData(offset);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const offset = (currentPage - 1) * 50;

  const filteredData = taskData.filter((task) => {
    const query = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      task.Topics.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gray-400 text-gray-900">
      <Header />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">
          LeetSheet Task Tracker
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        {filteredData.length > 0 ? (
          <Card data={filteredData} />
        ) : (
          <p>No tasks found.</p>
        )}
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
