import React from "react";
import * as XLSX from "xlsx";

const Header = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch(
        "https://sheetdb.io/api/v1/369w89f027n82" // Fetch all data from the API
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Convert JSON data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");

      // Export to Excel
      XLSX.writeFile(workbook, "tasks.xlsx");
    } catch (error) {
      console.error("Failed to download data:", error);
    }
  };

  return (
    <header className="bg-[#282828] sticky shadow-lg p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#FFA116]">LEETSHEET</h1>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-[#FFA116] text-white rounded hover:bg-orange-600 transition"
        >
          Export
        </button>
      </nav>
    </header>
  );
};

export default Header;
