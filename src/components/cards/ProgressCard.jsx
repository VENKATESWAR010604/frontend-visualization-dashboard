import { useEffect, useState } from "react";
import axios from "axios";

const COLORS = [
  "from-purple-500 to-indigo-500",
  "from-blue-400 to-cyan-400",
  "from-green-400 to-emerald-400",
  "from-pink-400 to-rose-400",
];

export default function ProgressCard() {
  const [topics, setTopics] = useState([]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/insights/topics")
      .then((res) => {
        const data = res.data || [];

        const total = data.reduce((sum, item) => sum + item.count, 0);

        const formatted = data
          .filter((item) => item._id)       // remove empty topics
          .slice(0, 4)                      // show only top 4
          .map((item, index) => ({
            label: item._id,
            value: total
              ? Math.round((item.count / total) * 100)
              : 0,
            color: COLORS[index % COLORS.length],
          }));

        setTopics(formatted);
        setTimeout(() => setAnimate(true), 300);
      })
      .catch((err) => console.error("❌ Topic API error:", err));
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 h-full flex flex-col overflow-hidden">

      <h3 className="text-sm font-semibold text-gray-700 mb-5">
        Top Topics
      </h3>

      <div className="flex-1 space-y-5">
        {topics.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span className="capitalize">{item.label}</span>
              <span className="font-medium">{item.value}%</span>
            </div>

            <div className="w-full h-3.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                style={{
                  width: animate ? `${item.value}%` : "0%",
                }}
              />
            </div>
          </div>
        ))}

        {topics.length === 0 && (
          <p className="text-center text-gray-400 text-sm">
            No topic data available
          </p>
        )}
      </div>

    </div>
  );
}
