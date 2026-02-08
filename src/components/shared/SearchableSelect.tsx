import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaSearch, FaChevronDown, FaTimes } from "react-icons/fa";
import { useGetTravelLocationsQuery } from "@/app/features/travel/travelApi";
import useAuth from "@/Hooks/useAuth";

interface SearchableSelectProps {
    name: string;
    placeholder: string;
    defaultValue?: string;
    label: string;
    required?: boolean;
    onChange?: (value: string) => void;
}

const SearchableSelect = ({ name, placeholder, defaultValue = "", label, required = false, onChange }: SearchableSelectProps) => {
    const { darkMode } = useAuth() as any;
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { data: locationsRes, isLoading } = useGetTravelLocationsQuery(searchTerm);
    const locations = locationsRes?.data || [];

    useEffect(() => {
        setSelectedValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        setIsOpen(false);
        setSearchTerm("");
        if (onChange) onChange(value);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedValue("");
        if (onChange) onChange("");
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {label}
            </label>
            
            {/* Hidden input for form submission */}
            <input type="hidden" name={name} value={selectedValue} required={required} />

            <div 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full p-3 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                    isOpen ? "ring-2 ring-main border-main" : ""
                } ${
                    darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                }`}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    <FaMapMarkerAlt className={darkMode ? "text-gray-400" : "text-gray-500"} />
                    <span className={`truncate ${!selectedValue ? (darkMode ? "text-gray-500" : "text-gray-400") : ""}`}>
                        {selectedValue || placeholder}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {selectedValue && (
                        <FaTimes 
                            onClick={handleClear}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        />
                    )}
                    <FaChevronDown className={`text-sm transition-transform duration-300 ${isOpen ? "rotate-180 text-main" : "text-gray-400"}`} />
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute z-[100] w-full mt-2 rounded-xl shadow-2xl border overflow-hidden ${
                            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                        }`}
                    >
                        {/* Search Input */}
                        <div className={`p-3 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    autoFocus
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search location..."
                                    className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg outline-none transition-all ${
                                        darkMode ? "bg-gray-700 text-white border-gray-600 focus:bg-gray-600" : "bg-gray-50 text-gray-900 border-gray-200 focus:bg-white"
                                    } border`}
                                />
                            </div>
                        </div>

                        {/* Options List */}
                        <div className="max-h-60 overflow-y-auto custom-scrollbar">
                            {isLoading ? (
                                <div className="p-4 text-center">
                                    <div className="animate-spin h-5 w-5 border-2 border-main border-t-transparent rounded-full mx-auto"></div>
                                </div>
                            ) : locations.length > 0 ? (
                                locations.map((loc: any) => (
                                    <div
                                        key={loc.id}
                                        onClick={() => handleSelect(loc.name)}
                                        className={`px-4 py-3 cursor-pointer flex items-center justify-between transition-colors ${
                                            selectedValue === loc.name 
                                                ? (darkMode ? "bg-main/20 text-main" : "bg-main/10 text-main") 
                                                : (darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-50 text-gray-700")
                                        }`}
                                    >
                                        <div>
                                            <p className="font-semibold text-sm">{loc.name}</p>
                                            <p className={`text-[10px] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{loc.address}</p>
                                        </div>
                                        {selectedValue === loc.name && <div className="w-2 h-2 rounded-full bg-main shadow-lg shadow-main/50"></div>}
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center">
                                    <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>No locations found</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchableSelect;
