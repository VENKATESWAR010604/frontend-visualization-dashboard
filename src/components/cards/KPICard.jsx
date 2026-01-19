import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp, Database, Activity, Target } from "lucide-react";

export default function KPICard() {
  const [kpi, setKpi] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/insights/kpis")
      .then((res) => setKpi(res.data))
      .catch((err) => console.error("KPI API error:", err));
  }, []);

  if (!kpi) {
    return (
      <div className="bg-white rounded-xl shadow p-5 h-full flex items-center justify-center">
        <p className="text-gray-400">Loading KPIs...</p>
      </div>
    );
  }

  const cards = [
    {
      title: "Avg Intensity",
      value: kpi.avgIntensity?.toFixed(1),
      icon: Activity,
      color: "text-purple-600",
    },
    {
      title: "Avg Likelihood",
      value: kpi.avgLikelihood?.toFixed(1),
      icon: Target,
      color: "text-blue-600",
    },
    {
      title: "Avg Relevance",
      value: kpi.avgRelevance?.toFixed(1),
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Total Records",
      value: kpi.totalRecords,
      icon: Database,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-5 h-full flex flex-col">
      <h2 className="font-semibold mb-4">KPI Overview</h2>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {cards.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="rounded-xl border p-4 flex flex-col justify-between hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{item.title}</p>
                <Icon size={20} className={item.color} />
              </div>

              <h3 className="text-2xl font-bold mt-3 text-gray-800">
                {item.value}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
