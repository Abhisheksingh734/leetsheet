import React, { useState } from "react";

const Card = ({ data }) => {
  const [markedRows, setMarkedRows] = useState({});

  const handleMark = (id) => {
    setMarkedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the state of the marked row
    }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-4 border-b">Problem Title</th>
            <th className="py-3 px-4 border-b">Difficulty</th>
            <th className="py-3 px-4 border-b">Topics</th>
            <th className="py-3 px-4 border-b">Likes</th>
            <th className="py-3 px-4 border-b text-center">Completed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task, index) => (
            <tr
              key={`${task.questionFrontendId}-${index}`} // Unique key
              className={`${
                markedRows[task.questionFrontendId]
                  ? "bg-green-100"
                  : "bg-white"
              } hover:bg-gray-100 transition-all duration-150 ease-in-out`}
            >
              <td className="px-6 py-4 border-b text-xl font-semibold text-gray-900">
                {task.title}
              </td>
              <td className="px-6 py-4 border-b">{task.Difficulty}</td>
              <td className="px-6 py-4 border-b">{task.Topics}</td>
              <td className="px-6 py-4 border-b">{task.Likes}</td>
              <td className="px-6 py-4 border-b text-center">
                <input
                  type="checkbox"
                  checked={markedRows[task.questionFrontendId] || false}
                  onChange={() => handleMark(task.questionFrontendId)}
                  className="cursor-pointer h-6 w-6"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Card;
