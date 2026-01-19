import {
  Search,
  Calendar,
  Layers,
  LayoutDashboard,
  Globe,
  Flag,
  MapPin,
  Activity,
  BarChart3,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "End Year", icon: Calendar },
  { name: "Topics", icon: Layers },
  { name: "Region", icon: Globe },
  { name: "Country", icon: Flag },
  { name: "City", icon: MapPin },
  { name: "Intensity", icon: Activity },
  { name: "SWOT", icon: BarChart3 },
];

export default function Sidebar({ active, onChange }) {
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-[260px] bg-gradient-to-b from-[#f8f7ff] to-[#f1efff] border-r border-purple-100 px-4 py-5 flex flex-col">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-7 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-lg shadow">
          ❤
        </div>
        <span className="font-semibold text-[17px] tracking-wide text-purple-700">
          VISUALIZATION DASHBOARD
        </span>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={15} className="absolute left-3 top-3 text-purple-400" />
        <input
          placeholder="Search..."
          className="w-full h-10 pl-9 pr-3 rounded-xl bg-white shadow-sm text-[13px] outline-none placeholder:text-purple-300 focus:ring-2 focus:ring-purple-200"
        />
      </div>

      {/* Menu */}
      <div className="flex-1 flex flex-col gap-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.name;

          return (
            <button
              key={item.name}
              onClick={() => onChange(item.name)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md"
                    : "text-purple-600 hover:bg-purple-100"
                }
              `}
            >
              <Icon
                size={16}
                className={isActive ? "text-white" : "text-purple-400"}
              />
              <span className="flex-1 text-left">{item.name}</span>

              {isActive && (
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <button
        onClick={() => navigate("/")}
        className="mt-5 flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13.5px] font-medium text-red-500 hover:bg-red-100 transition"
      >
        <LogOut size={16} className="text-red-400" />
        Logout
      </button>

    </aside>
  );
}
