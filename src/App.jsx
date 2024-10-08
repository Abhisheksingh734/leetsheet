import { useEffect, useState } from "react";
import React from "react";
import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";

const App = () => {
  const [taskData, setTaskData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const fetchData = async (page) => {
    const limit = 50; // Limit of items per page
    const offset = (page - 1) * limit; // Calculate the offset based on the current page

    setLoading(true);
    try {
      const response = await fetch(
        `https://sheetdb.io/api/v1/369w89f027n82?limit=${limit}&offset=${offset}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Check for duplicates using a Set for existing IDs
      setTaskData((prevData) => {
        const existingIds = new Set(
          prevData.map((task) => task.questionFrontendId)
        ); // Replace with your unique identifier
        const newTasks = data.filter(
          (task) => !existingIds.has(task.questionFrontendId)
        );
        return [...prevData, ...newTasks];
      });

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

  const filteredData = taskData.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.Topics.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDifficulty =
      selectedDifficulty === "All" ||
      task.Difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    return matchesSearch && matchesDifficulty;
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
            className="border rounded p-2 w-4/12 mr-5 focus:outline-none focus:border-gray-400"
          />
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="border rounded p-2 w-36 "
          >
            <option value="All">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        {/* <div className="mb-4"></div> */}
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
