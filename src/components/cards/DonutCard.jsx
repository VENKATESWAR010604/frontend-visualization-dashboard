import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DonutCard({ yearFilter }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/insights/topics", {
        params: yearFilter || {},
      })
      .then((res) => setChartData(res.data))
      .catch((err) => console.error("Donut API Error:", err));
  }, [yearFilter]);

  const labels = chartData.map((d) => d._id || "Unknown");
  const values = chartData.map((d) => d.count);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#8B5CF6",
          "#60A5FA",
          "#34D399",
          "#F472B6",
          "#FBBF24",
          "#A78BFA",
          "#22C55E",
          "#EC4899",
        ],
        borderWidth: 1,
        cutout: "72%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        maxHeight: 90,                 // ✅ prevents overflow
        labels: {
          boxWidth: 10,
          padding: 12,
          font: { size: 11 },
        },
      },
    },
  };

  const total = values.reduce((a, b) => a + b, 0);
  const percentage = total ? Math.round((values[0] / total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col h-full overflow-hidden">

      <h2 className="font-semibold mb-2">Topics Distribution</h2>

      {/* Chart */}
      <div className="relative flex-1 flex items-center justify-center">
        <div className="w-[240px] h-[240px]"> {/* ✅ reduced size */}
          <Doughnut data={data} options={options} />
        </div>

        {/* Center Text */}
        <div className="absolute text-center">
          <p className="text-3xl font-bold text-purple-600">
            {percentage}%
          </p>
          <p className="text-xs text-gray-500">Intensity</p>
        </div>
      </div>

    </div>
  );
}
