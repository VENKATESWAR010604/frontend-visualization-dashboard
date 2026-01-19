import { useState } from "react";
import EndYearFilterCard from "./cards/EndYearFilterCard";
import DonutCard from "./cards/DonutCard";
import BarCard from "./cards/BarCard";
import ProgressCard from "./cards/ProgressCard";
import SWOTCard from "./cards/SWOTCard";
import RegionCard from "./cards/RegionCard";
import CountryCard from "./cards/CountryCard";
import KPICard from "./cards/KPICard";
import IntensityRegionCard from "./cards/IntensityRegionCard";

export default function MainBar({ activeMenu }) {
  const [yearFilter, setYearFilter] = useState({});

  /* ---------- Single Page Views ---------- */
  if (activeMenu === "End Year") {
    return <EndYearFilterCard onApply={setYearFilter} />;
  }

  if (activeMenu === "Topics") {
    return (
      <div className="grid grid-cols-2 gap-5 auto-rows-[300px]">
        <div className="h-full"><DonutCard /></div>
        <div className="h-full"><ProgressCard /></div>
      </div>
    );
  }

  if (activeMenu === "Region") return <RegionCard />;
  if (activeMenu === "Country") return <CountryCard />;
  if (activeMenu === "SWOT") return <SWOTCard />;
  if (activeMenu === "Intensity") return <IntensityRegionCard />;

  /* ---------- Dashboard Grid ---------- */
  return (
    <div className="grid grid-cols-12 gap-5 auto-rows-[300px]">

      {/* Row 1 */}
      <div className="col-span-3 h-full">
        <EndYearFilterCard onApply={setYearFilter} />
      </div>

      <div className="col-span-4 h-full">
        <DonutCard />
      </div>

      <div className="col-span-5 h-full">
        <BarCard yearFilter={yearFilter} />
      </div>

      {/* Row 2 */}
      <div className="col-span-3 h-full">
        <KPICard />
      </div>

      <div className="col-span-4 h-full">
        <ProgressCard />
      </div>

      <div className="col-span-5 h-full">
        <IntensityRegionCard />
      </div>

      {/* Row 3 */}
      <div className="col-span-3 h-full">
        <CountryCard />
      </div>

      <div className="col-span-4 h-full">
        <SWOTCard />
      </div>

      <div className="col-span-5 h-full">
        <RegionCard />
      </div>

    </div>
  );
}
