import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data, markedRows, handleMark }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-[#282828] text-gray-300">
          <tr>
            <th className="py-3 px-4 border-b">Problem Title</th>
            <th className="py-3 px-4 border-b">Difficulty</th>
            <th className="py-3 px-4 border-b">Topics</th>
            <th className="py-3 px-4 border-b">Likes</th>
            <th className="py-3 px-4 border-b text-center">Completed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task) => (
            <tr
              key={task.questionFrontendId} // Use only questionFrontendId for key
              className={
                markedRows[task.questionFrontendId] ? "bg-green-900" : ""
              }
            >
              <td className="px-6 py-4 border-b text-xl font-semibold text-gray-300">
                <a
                  href={`https://leetcode.com/problems/` + task.titleSlug}
                  target="_blank"
                >
                  {task.title}
                </a>
              </td>
              <td
                className={`px-6 py-4 border-b ${
                  task.Difficulty.toLowerCase() === "easy"
                    ? "text-green-500"
                    : task.Difficulty.toLowerCase() === "medium"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {task.Difficulty}
              </td>
              <td className="px-6 py-4 border-b text-gray-300">
                {task.Topics}
              </td>
              <td className="px-6 py-4 border-b text-gray-300">{task.Likes}</td>
              <td className="px-6 py-4 border-b text-center">
                <input
                  type="checkbox"
                  checked={!!markedRows[task.questionFrontendId]} // Ensure boolean value
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
