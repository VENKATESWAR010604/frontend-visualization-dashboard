import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/Topbar";
import MainBar from "../components/Mainbar";

const MENU_ITEMS = [
  "Dashboard",
  "End Year",
  "Topics",
  "Region",
  "Country",
  "Intensity",
  "SWOT",
];

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  useEffect(() => {
    console.log("ACTIVE MENU CHANGED:", activeMenu);
  }, [activeMenu]);

  return (
    <div className="flex min-h-screen bg-[#f4f6fb]">

      <Sidebar
        active={activeMenu}
        onChange={(menu) => {
          console.log("Sidebar clicked:", menu);
          setActiveMenu(menu);
        }}
      />

      <div className="flex-1 ml-[260px] p-5 flex flex-col gap-5">

        <TopBar
          menuItems={MENU_ITEMS}
          onSelect={(menu) => {
            console.log("Topbar selected:", menu);
            setActiveMenu(menu);
          }}
        />

        <MainBar activeMenu={activeMenu} />

      </div>
    </div>
  );
}
