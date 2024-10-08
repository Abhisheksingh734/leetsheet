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
  const [markedRows, setMarkedRows] = useState(() => {
    // Initialize markedRows from local storage
    const storedMarks = localStorage.getItem("markedRows");
    return storedMarks ? JSON.parse(storedMarks) : {};
  });

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
      console.log(data);

      setTaskData((prevData) => {
        const existingIds = new Set(
          prevData.map((task) => task.questionFrontendId)
        );
        const newTasks = data.filter(
          (task) => !existingIds.has(task.questionFrontendId)
        );
        return [...prevData, ...newTasks];
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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Save marked rows to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("markedRows", JSON.stringify(markedRows));
    console.log("Saved marked rows to local storage:", markedRows);
  }, [markedRows]);

  const handleMark = (id) => {
    setMarkedRows((prevState) => {
      const newState = { ...prevState };
      if (newState[id]) {
        // If it exists, delete it
        delete newState[id];
      } else {
        // Otherwise, add it
        newState[id] = true; // You can set it to any value, here true
      }
      return newState;
    });
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
    <div className="min-h-screen bg-[#1A1A1A] text-gray-300">
      <Header />
      <main className="p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded p-2 w-4/12 mr-5 focus:outline-none focus:border-[#FFA116]"
          />
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="border rounded p-2 w-36 bg-[#282828] text-gray-300 focus:outline-none focus:border-[#FFA116]"
          >
            <option value="All">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        {filteredData.length > 0 ? (
          <Card
            data={filteredData}
            markedRows={markedRows}
            handleMark={handleMark}
          />
        ) : (
          <p>No tasks found.</p>
        )}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleNextPage}
            disabled={loading}
            className={`px-4 py-2 bg-[#FFA116] text-white rounded ${
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
