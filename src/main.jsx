import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ✅ ChartJS global register
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

createRoot(document.getElementById("root")).render(<App />);
