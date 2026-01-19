import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BarCard({ yearFilter }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/insights/sector", {
        params: yearFilter || {},
      })
      .then((res) => setChartData(res.data))
      .catch((err) => console.error("Bar API error:", err));
  }, [yearFilter]);

  const labels = chartData.map((d) => d._id || "Unknown");
  const values = chartData.map((d) => d.avgIntensity || 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Intensity",
        data: values,

        // 🎨 Color
        backgroundColor: "#8B5CF6",
        borderRadius: 10,

        // ✅ spacing between bars
        barThickness: 20,
        categoryPercentage: 0.6,
        barPercentage: 0.7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: {
        ticks: {
          maxRotation: 35,
          minRotation: 35,
          autoSkip: false,
          font: { size: 11 },

          // ✂️ truncate long labels
          callback: function (value) {
            const label = this.getLabelForValue(value);
            return label.length > 12 ? label.slice(0, 12) + "..." : label;
          },
        },
        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,
        grid: {
          color: "#f1f1f1",
        },
      },
    },

    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 overflow-hidden">
      <h2 className="font-semibold mb-3">Intensity by Sector</h2>

      {/* 📊 Chart */}
      <div className="h-[280px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
