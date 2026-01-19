import { useEffect, useState } from "react";
import axios from "axios";

export default function SWOTCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/insights/swot")
      .then((res) => setData(res.data || []))
      .catch((err) => console.error("SWOT API Error:", err));
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 h-full flex flex-col overflow-hidden">

      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        SWOT / PESTLE Distribution
      </h3>

      <div className="flex flex-col gap-2 flex-1 overflow-auto">

        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-between text-xs text-gray-600 border-b pb-1"
          >
            <span className="capitalize">{item._id}</span>
            <span className="font-semibold">{item.count}</span>
          </div>
        ))}

        {data.length === 0 && (
          <p className="text-xs text-gray-400 text-center mt-10">
            No SWOT data
          </p>
        )}

      </div>
    </div>
  );
}
