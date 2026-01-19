import { useEffect, useState } from "react";
import axios from "axios";

export default function RegionCard() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/insights/region")
      .then((res) => setRegions(res.data))
      .catch((err) => console.error("Region API Error:", err));
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 h-full flex flex-col overflow-hidden">

      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Region Intensity
      </h3>

      <div className="flex flex-col gap-3 flex-1 overflow-auto pr-1">

        {regions.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-xs text-gray-600"
          >
            <span className="truncate max-w-[150px]">{item._id}</span>

            <div className="flex items-center gap-2">
              <div className="w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-400 to-purple-600"
                  style={{
                    width: `${Math.min(item.avgIntensity * 10, 100)}%`,
                  }}
                />
              </div>

              <span className="text-[11px] font-medium text-gray-500">
                {item.avgIntensity?.toFixed(1)}
              </span>
            </div>
          </div>
        ))}

        {regions.length === 0 && (
          <p className="text-xs text-gray-400 text-center mt-10">
            No region data
          </p>
        )}

      </div>
    </div>
  );
}
