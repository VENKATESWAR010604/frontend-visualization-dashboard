import { useState } from "react";

export default function EndYearFilterCard({ onApply }) {
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const handleApply = () => {
    onApply({
      startYear,
      endYear,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 h-full min-h-[260px] flex flex-col justify-between">
      <h2 className="text-lg font-semibold">End Year Filter</h2>

      <div className="flex gap-4">
        <select
          className="border rounded-lg px-4 py-3 text-lg w-full"
          onChange={(e) => setStartYear(e.target.value)}
        >
          <option value="">Start Year</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
          <option>2019</option>
        </select>

        <select
          className="border rounded-lg px-4 py-3 text-lg w-full"
          onChange={(e) => setEndYear(e.target.value)}
        >
          <option value="">End Year</option>
          <option>2018</option>
          <option>2019</option>
          <option>2020</option>
          <option>2021</option>
        </select>
      </div>

      <button
        onClick={handleApply}
        className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold text-lg transition"
      >
        Apply
      </button>
    </div>
  );
}
