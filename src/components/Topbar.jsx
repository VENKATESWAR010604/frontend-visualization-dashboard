import { Search, Bell, User, Settings, HelpCircle, LogOut, CreditCard, DollarSign } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function TopBar({ menuItems = [], onSelect }) {
  const [query, setQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  const filtered =
    query.length === 0
      ? []
      : menuItems.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (item) => {
    onSelect(item);
    setQuery("");
    setOpenSearch(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full h-16 bg-white rounded-2xl shadow-sm px-5 flex items-center justify-between">

      {/* 🔍 Search Box */}
      <div className="relative w-[45%]">
        <div className="flex items-center gap-3 bg-[#f4f6fb] px-4 py-2 rounded-xl">
          <Search size={18} className="text-gray-400" />
          <input
            value={query}
            onFocus={() => setOpenSearch(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenSearch(true);
            }}
            placeholder="Search menu..."
            className="bg-transparent outline-none w-full text-sm text-gray-600 placeholder-gray-400"
          />
        </div>

        {/* Search Dropdown */}
        {openSearch && filtered.length > 0 && (
          <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-xl overflow-hidden z-50 border">
            {filtered.map((item) => (
              <button
                key={item}
                onClick={() => handleSelect(item)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-purple-50 text-gray-700 transition"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 🔔 Right Actions */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#f4f6fb] hover:bg-purple-100 transition cursor-pointer">
          <Bell size={18} className="text-gray-500" />
        </div>

        {/* 👤 Profile */}
        <div ref={profileRef} className="relative">
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <img
              src="https://i.pravatar.cc/100?img=12"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="text-sm leading-tight">
              <p className="font-medium text-gray-700">KASU</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>

          {/* 🧾 Profile Dropdown */}
          {openProfile && (
            <div className="absolute right-0 mt-3 w-[260px] bg-[#2f3349] text-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">

              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b border-white/10">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#2f3349]" />
                </div>
                <div>
                  <p className="font-semibold">KASU</p>
                  <p className="text-xs text-white/60">Admin</p>
                </div>
              </div>

              {/* Menu */}
              <div className="p-2 space-y-1 text-sm">
                <Item icon={<User size={16} />} label="Profile" />
                <Item icon={<Settings size={16} />} label="Settings" />

                <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} />
                    Billing Plan
                  </div>
                  <span className="bg-red-500 text-xs px-2 rounded-full">4</span>
                </div>

                <Item icon={<DollarSign size={16} />} label="Pricing" />
                <Item icon={<HelpCircle size={16} />} label="FAQ" />
              </div>

              {/* Logout */}
              <div className="p-3">
                <button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition rounded-lg py-2 text-sm font-semibold">
                  Logout <LogOut size={16} />
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}

/* Small reusable menu item */
function Item({ icon, label }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer">
      {icon}
      {label}
    </div>
  );
}
