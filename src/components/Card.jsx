import React from "react";

const Card = ({ dpp, data, markedRows, handleMark }) => {
  console.log(dpp);
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
          <tr>
            <td className="px-5 py-4 border-b text-lg font-semibold text-gray-300 ">
              <a
                href={`https://leetcode.com/problems/` + dpp.titleSlug}
                target="_blank"
              >
                {/* <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    className="text-blue dark:text-dark-blue h-5 w-5"
                  >
                    <path d="M15.207 11.293a1 1 0 010 1.414l-3.5 3.5a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L11 14.086l2.793-2.793a1 1 0 011.414 0z"></path>
                    <path d="M4 5a3 3 0 013-3h7.039a3 3 0 012.342 1.126l2.962 3.701A3 3 0 0120 8.702V19a3 3 0 01-3 3H7a3 3 0 01-3-3V5zm3-1a1 1 0 00-1 1v14a1 1 0 001 1h10a1 1 0 001-1V9h-3a2 2 0 01-2-2V4H7zm8 .6V7h1.92L15 4.6z"></path>
                  </svg> */}
                {/* </span> */}
                <p className="inline">{dpp.questionTitle}</p>
              </a>
            </td>
            <td className={`px-6 py-4 border-b text-white`}>
              <button
                className={`m-2 p-2 px-4 rounded-3xl ${
                  dpp.difficulty.toLowerCase() === "easy"
                    ? "bg-green-500"
                    : dpp.difficulty.toLowerCase() === "medium"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {dpp.difficulty}
              </button>
            </td>
            <td className="px-6 py-4 border-b text-gray-300">{"Hidden"}</td>
            <td className="px-6 py-4 border-b text-gray-300">{dpp.likes}</td>
            <td className="px-6 py-4 border-b text-center">
              <input
                type="checkbox"
                checked={!!markedRows[dpp.questionFrontendId]} // Ensure boolean value
                onChange={() => handleMark(dpp.questionFrontendId)}
                className="w-6 h-5 text-yellow-500 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
              />
            </td>
          </tr>
          {data.map((task) => (
            <tr
              key={task.questionFrontendId} // Use only questionFrontendId for key
              className={
                markedRows[task.questionFrontendId]
                  ? "bg-green-900 hover:dark:bg-green-950  transition-all ease-in-out"
                  : "hover:dark:bg-[#282828] transition-all ease-in-out "
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
              <td className={`px-6 py-4 border-b text-white`}>
                <button
                  className={`m-2 p-2 px-4 rounded-3xl ${
                    task.Difficulty.toLowerCase() === "easy"
                      ? "bg-green-500"
                      : task.Difficulty.toLowerCase() === "medium"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {task.Difficulty}
                </button>
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
                  className="w-6 h-5 text-yellow-500 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
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
