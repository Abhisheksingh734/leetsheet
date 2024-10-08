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
      <table className="min-w-full border border-gray-600 dark:border-gray-700 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-700 dark:bg-gray-800 text-gray-200">
          <tr>
            <th className="py-4 px-4 border-b dark:border-gray-700 text-xl font-bold">
              Problem Title
            </th>
            <th className="py-4 px-4 border-b dark:border-gray-700 text-xl font-bold">
              Difficulty
            </th>
            <th className="py-4 px-4 border-b dark:border-gray-700 text-xl font-bold">
              Topics
            </th>
            <th className="py-4 px-4 border-b dark:border-gray-700 text-xl font-bold">
              Likes
            </th>
            <th className="py-4 px-4 border-b dark:border-gray-700 text-xl font-bold text-center">
              Completed
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((task) => (
            <tr
              key={task.questionFrontendId}
              className={`${
                markedRows[task.questionFrontendId]
                  ? "bg-green-100 dark:bg-green-900"
                  : "bg-gray-100 dark:bg-gray-800"
              } hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-150 ease-in-out`}
            >
              <td className="px-6 py-4 border-b dark:border-gray-700 text-xl font-semibold">
                {task.title}
              </td>
              <td className="px-6 py-4 border-b dark:border-gray-700">
                {task.Difficulty}
              </td>
              <td className="px-6 py-4 border-b dark:border-gray-700">
                {task.Topics}
              </td>
              <td className="px-6 py-4 border-b dark:border-gray-700">
                {task.Likes}
              </td>
              <td className="px-6 py-4 border-b dark:border-gray-700 text-center">
                <input
                  type="checkbox"
                  checked={markedRows[task.questionFrontendId] || false}
                  onChange={() => handleMark(task.questionFrontendId)}
                  className={`cursor-pointer h-6 w-6 ${
                    markedRows[task.questionFrontendId]
                      ? "bg-orange-500 border-orange-500"
                      : "hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
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
