import { useEffect, useState } from "react";
import axios from "axios";

/* 🎨 Heat color logic */
function getColor(value) {
  if (value >= 8) return "bg-purple-600";
  if (value >= 7) return "bg-purple-500";
  if (value >= 6) return "bg-purple-400";
  if (value >= 5) return "bg-purple-300";
  return "bg-purple-200";
}

export default function IntensityRegionCard() {
  const [regions, setRegions] = useState([]);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/insights/region")
      .then((res) => {
        const formatted = res.data.map((item) => {
          const intensity = Math.round(item.avgIntensity || 0);

          // create 7 blocks like heatmap
          const blocks = Array.from({ length: 7 }, () => intensity);

          return {
            name: item._id,
            values: blocks,
            avg: intensity,
          };
        });

        setRegions(formatted);
      })
      .catch((err) =>
        console.error("❌ Region intensity API error:", err)
      );
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 h-[300px] flex flex-col overflow-hidden">

      <h3 className="text-sm font-semibold text-gray-700 mb-2">
        Intensity by Region
      </h3>

      {/* 🔥 Scrollable Content */}
      <div className="flex flex-col gap-2 flex-1 relative overflow-y-auto pr-2">

        {regions.map((region) => (
          <div key={region.name} className="flex items-center gap-3">

            <span className="w-36 text-xs text-gray-600 truncate">
              {region.name}
            </span>

            <div className="flex gap-1">
              {region.values.map((value, i) => (
                <div
                  key={i}
                  onMouseEnter={() =>
                    setTooltip({
                      region: region.name,
                      value: region.avg,
                    })
                  }
                  onMouseLeave={() => setTooltip(null)}
                  className={`w-7 h-6 rounded ${getColor(
                    value
                  )} cursor-pointer transition hover:scale-110`}
                />
              ))}
            </div>

          </div>
        ))}

        {/* 🧾 Tooltip */}
        {tooltip && (
          <div className="absolute right-3 top-3 bg-purple-600 text-white text-xs px-3 py-2 rounded-lg shadow pointer-events-none">
            <div className="font-semibold">{tooltip.region}</div>
            <div>Avg Intensity: {tooltip.value}</div>
          </div>
        )}
      </div>

      {/* 📊 Legend */}
      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
        <span>Low</span>
        <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-purple-200 via-purple-400 to-purple-600" />
        <span>High</span>
      </div>

    </div>
  );
}