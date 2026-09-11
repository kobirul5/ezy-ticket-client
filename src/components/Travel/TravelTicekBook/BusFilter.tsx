import { useEffect, useMemo, useState } from "react";
import useAuth from "@/Hooks/useAuth";
import useTravelContext from "@/Hooks/TrevalHook/useTravelContext";
import { FaFilter, FaRedo, FaBus, FaSlidersH, FaClock, FaSortAmountDown } from "react-icons/fa";

const BusFilter = () => {
  const { darkMode } = useAuth() as any;
  const { allBusData, setFilterBus } = useTravelContext() as any;

  // Dynamically extract unique Operators list from API data
  const operatorsList: string[] = useMemo(() => {
    if (!allBusData || !Array.isArray(allBusData)) return [];
    const ops = allBusData
      .map((bus: any) => bus.busName || bus.name || bus.operator)
      .filter((name: string) => name && name.trim().length > 0);
    return Array.from(new Set(ops));
  }, [allBusData]);

  // Dynamically calculate highest price from API data
  const highestPrice = useMemo(() => {
    if (!allBusData || !Array.isArray(allBusData) || allBusData.length === 0) return 3000;
    const prices = allBusData.map((bus: any) => Number(bus.price || 0));
    const max = Math.max(...prices);
    return max > 0 ? max : 3000;
  }, [allBusData]);

  const [maxPrice, setMaxPrice] = useState<number>(highestPrice);
  const [selectedTypes, setSelectedTypes] = useState<{ [key: string]: boolean }>({
    ac: false,
    nonAc: false,
  });

  const [selectedOperators, setSelectedOperators] = useState<{ [key: string]: boolean }>({});

  const [timeWindows, setTimeWindows] = useState<{ [key: string]: boolean }>({
    morning: false,   // 6 AM - 12 PM
    afternoon: false, // 12 PM - 6 PM
    night: false,     // 6 PM - 6 AM
  });

  const [sortBy, setSortBy] = useState<string>("default");

  // Keep maxPrice in sync with highestPrice if user hasn't changed it
  useEffect(() => {
    if (highestPrice > 0) {
      setMaxPrice(highestPrice);
    }
  }, [highestPrice]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleOperatorChange = (op: string) => {
    setSelectedOperators((prev) => ({ ...prev, [op]: !prev[op] }));
  };

  const handleTimeChange = (time: string) => {
    setTimeWindows((prev) => ({ ...prev, [time]: !prev[time] }));
  };

  const handleReset = () => {
    setMaxPrice(highestPrice);
    setSelectedTypes({ ac: false, nonAc: false });
    setSelectedOperators({});
    setTimeWindows({ morning: false, afternoon: false, night: false });
    setSortBy("default");
  };

  useEffect(() => {
    if (!allBusData || !Array.isArray(allBusData)) return;

    let filtered = [...allBusData];

    // 1. Bus Category / Type Filter
    const anyTypeSelected = selectedTypes.ac || selectedTypes.nonAc;
    if (anyTypeSelected) {
      filtered = filtered.filter((bus: any) => {
        const typeStr = (bus.busType || bus.type || "").toUpperCase();
        if (selectedTypes.ac && typeStr.includes("AC") && !typeStr.includes("NON")) return true;
        if (selectedTypes.nonAc && (typeStr.includes("NON") || typeStr.includes("NON_AC"))) return true;
        return false;
      });
    }

    // 2. Bus Operator Filter (Dynamically derived from API)
    const activeOperators = Object.keys(selectedOperators).filter(
      (op) => selectedOperators[op]
    );
    if (activeOperators.length > 0) {
      filtered = filtered.filter((bus: any) => {
        const busName = bus.busName || bus.name || bus.operator || "";
        return activeOperators.some((op) =>
          busName.toLowerCase().includes(op.toLowerCase())
        );
      });
    }

    // 3. Price Filter (Dynamic max price)
    filtered = filtered.filter((bus: any) => {
      const price = Number(bus.price || 0);
      return price <= maxPrice;
    });

    // 4. Departure Time Filter
    const anyTimeSelected =
      timeWindows.morning || timeWindows.afternoon || timeWindows.night;
    if (anyTimeSelected) {
      filtered = filtered.filter((bus: any) => {
        const dep = bus.departure || bus.time || "";
        let hour = 12;
        const match = dep.match(/(\d+):(\d+)\s*(AM|PM)?/i);
        if (match) {
          hour = parseInt(match[1]);
          const ampm = match[3] ? match[3].toUpperCase() : "";
          if (ampm === "PM" && hour < 12) hour += 12;
          if (ampm === "AM" && hour === 12) hour = 0;
        }

        if (timeWindows.morning && hour >= 6 && hour < 12) return true;
        if (timeWindows.afternoon && hour >= 12 && hour < 18) return true;
        if (timeWindows.night && (hour >= 18 || hour < 6)) return true;
        return false;
      });
    }

    // 5. Sorting
    if (sortBy === "priceAsc") {
      filtered.sort((a: any, b: any) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "priceDesc") {
      filtered.sort((a: any, b: any) => (b.price || 0) - (a.price || 0));
    }

    setFilterBus(filtered);
  }, [
    selectedTypes,
    selectedOperators,
    maxPrice,
    timeWindows,
    sortBy,
    allBusData,
    setFilterBus,
  ]);

  return (
    <div
      className={`w-full p-5 rounded-2xl shadow-lg border ${
        darkMode
          ? "bg-[#1d1d1d] text-white border-gray-800"
          : "bg-white text-gray-800 border-gray-100"
      } space-y-6`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <FaFilter className="text-main text-lg" />
          <h2 className="text-xl font-bold">Filters</h2>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-sm font-semibold text-main hover:text-green-700 transition-colors"
        >
          <FaRedo className="text-xs" /> Reset
        </button>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-supporting mb-3 flex items-center gap-2">
          <FaSortAmountDown className="text-main" /> Sort By
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={`w-full p-2.5 rounded-xl border text-sm font-medium transition-all ${
            darkMode
              ? "bg-dark-surface border-gray-700 text-white"
              : "bg-gray-50 border-gray-200 text-gray-800"
          }`}
        >
          <option value="default">Popularity / Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
      </div>

      {/* Bus Category / Type */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-supporting mb-3 flex items-center gap-2">
          <FaBus className="text-main" /> Bus Category
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer hover:opacity-80">
            <input
              type="checkbox"
              checked={selectedTypes.ac}
              onChange={() => handleTypeChange("ac")}
              className="checkbox checkbox-success checkbox-sm"
            />
            <span className="text-sm font-medium">AC Bus</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:opacity-80">
            <input
              type="checkbox"
              checked={selectedTypes.nonAc}
              onChange={() => handleTypeChange("nonAc")}
              className="checkbox checkbox-success checkbox-sm"
            />
            <span className="text-sm font-medium">Non AC Bus</span>
          </label>
        </div>
      </div>

      {/* Price Range Slider (Dynamically derived max price from API) */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-supporting flex items-center gap-2">
            <FaSlidersH className="text-main" /> Max Ticket Price
          </h3>
          <span className="text-sm font-bold text-main">Tk {maxPrice}</span>
        </div>
        <input
          type="range"
          min="300"
          max={highestPrice > 500 ? highestPrice : 3000}
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="range range-success range-xs w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1 font-mono">
          <span>Tk 300</span>
          <span>Tk {highestPrice}</span>
        </div>
      </div>

      {/* Departure Time */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-supporting mb-3 flex items-center gap-2">
          <FaClock className="text-main" /> Departure Time
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer hover:opacity-80">
            <input
              type="checkbox"
              checked={timeWindows.morning}
              onChange={() => handleTimeChange("morning")}
              className="checkbox checkbox-success checkbox-sm"
            />
            <span className="text-sm font-medium">Morning (6 AM - 12 PM)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:opacity-80">
            <input
              type="checkbox"
              checked={timeWindows.afternoon}
              onChange={() => handleTimeChange("afternoon")}
              className="checkbox checkbox-success checkbox-sm"
            />
            <span className="text-sm font-medium">Afternoon (12 PM - 6 PM)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:opacity-80">
            <input
              type="checkbox"
              checked={timeWindows.night}
              onChange={() => handleTimeChange("night")}
              className="checkbox checkbox-success checkbox-sm"
            />
            <span className="text-sm font-medium">Night (6 PM - 6 AM)</span>
          </label>
        </div>
      </div>

      {/* Operators List (100% Dynamic from API Data) */}
      {operatorsList.length > 0 && (
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-supporting mb-3">
            Bus Operators ({operatorsList.length})
          </h3>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {operatorsList.map((op) => (
              <label
                key={op}
                className="flex items-center gap-3 cursor-pointer hover:opacity-80"
              >
                <input
                  type="checkbox"
                  checked={!!selectedOperators[op]}
                  onChange={() => handleOperatorChange(op)}
                  className="checkbox checkbox-success checkbox-sm"
                />
                <span className="text-sm font-medium truncate">{op}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BusFilter;
