import { useState } from "react";
import { FaBus, FaEnvelope, FaPhone, FaTags, FaUsers, FaMoneyBillWave, FaClock, FaCalendarAlt, FaMapMarkerAlt, FaImage, FaTrash } from "react-icons/fa";
import { useCreateBusServiceMutation, useGetTravelLocationsQuery } from "@/app/features/travel/travelApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "@/Hooks/useAuth";

const CreateBus = () => {
    const navigate = useNavigate();
    const { user } = useAuth() as any;
    const [createBusService, { isLoading }] = useCreateBusServiceMutation();
    const { data: locationsRes } = useGetTravelLocationsQuery(undefined);
    const locations = locationsRes?.data || [];

    const [formData, setFormData] = useState({
        name: "",
        email: user?.email || "",
        contact: "",
        busType: "NON_AC",
        totalSeats: 52,
        price: 350,
        travelTime: [] as string[],
        travelOffDates: [] as string[],
        departureLocation: [] as string[],
        destinationLocation: [] as string[]
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [newTime, setNewTime] = useState("");
    const [newOffDate, setNewOffDate] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: (name === "totalSeats" || name === "price") ? Number(value) : value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleAddItem = (field: "travelTime" | "travelOffDates", value: string) => {
        if (!value) return;
        setFormData(prev => ({
            ...prev,
            [field]: [...new Set([...prev[field], value])]
        }));
        if (field === "travelTime") setNewTime("");
        else setNewOffDate("");
    };

    const handleRemoveItem = (field: "travelTime" | "travelOffDates" | "departureLocation" | "destinationLocation", index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleLocationToggle = (field: "departureLocation" | "destinationLocation", locName: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(locName) 
                ? prev[field].filter(l => l !== locName) 
                : [...prev[field], locName]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.departureLocation.length === 0 || formData.destinationLocation.length === 0) {
            Swal.fire("Error", "Please select at least one departure and destination location", "error");
            return;
        }

        const submissionData = new FormData();
        if (imageFile) {
            submissionData.append("file", imageFile);
        }
        
        // Append all other fields as a JSON string to 'data'
        submissionData.append("data", JSON.stringify(formData));

        try {
            await createBusService(submissionData).unwrap();
            Swal.fire({
                title: "Success!",
                text: "Bus service created successfully",
                icon: "success",
                confirmButtonColor: "#3085d6"
            });
            navigate("/dashboard/MyBusServices");
        } catch (err: any) {
            Swal.fire("Error", err?.data?.message || "Failed to create bus service", "error");
        }
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="container mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-main text-white rounded-2xl shadow-lg shadow-main/20">
                        <FaBus className="text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Create New Bus</h1>
                        <p className="text-slate-500">Configure your bus service details and routes</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Basic Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-800">
                                <FaTags className="text-main" /> Basic Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600">Bus Service Name</label>
                                    <div className="relative">
                                        <FaBus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input 
                                            name="name" value={formData.name} onChange={handleChange} required
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-main transition-all outline-none" 
                                            placeholder="e.g. Green Line Paribahan"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600">Bus Type</label>
                                    <select 
                                        name="busType" value={formData.busType} onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-main transition-all outline-none"
                                    >
                                        <option value="AC">AC (Premium)</option>
                                        <option value="NON_AC">Non-AC (Standard)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600">Contact Email</label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input 
                                            name="email" value={formData.email} onChange={handleChange} required
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-main transition-all outline-none" 
                                            placeholder="service@bus.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600">Contact Number</label>
                                    <div className="relative">
                                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input 
                                            name="contact" value={formData.contact} onChange={handleChange} required
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-main transition-all outline-none" 
                                            placeholder="+880 1XXX XXXXXX"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing & Capacity */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-800">
                                        <FaMoneyBillWave className="text-amber-500" /> Pricing
                                    </h2>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">BDT</span>
                                        <input 
                                            type="number" name="price" value={formData.price} onChange={handleChange} required
                                            className="w-full pl-16 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all outline-none" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-800">
                                        <FaUsers className="text-indigo-500" /> Capacity
                                    </h2>
                                    <div className="relative">
                                        <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input 
                                            type="number" name="totalSeats" value={formData.totalSeats} onChange={handleChange} required
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Schedule & Image Upload */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-800">
                                <FaClock className="text-blue-500" /> Schedule & Media
                            </h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-600">Add Travel Times</label>
                                        <div className="flex gap-2">
                                            <input 
                                                type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)}
                                                className="flex-1 px-4 py-3 bg-slate-50 border-0 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <button 
                                                type="button" onClick={() => handleAddItem("travelTime", newTime)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                                            >Add</button>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {formData.travelTime.map((t, i) => (
                                                <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm flex items-center gap-2 font-medium">
                                                    {t} <button type="button" onClick={() => handleRemoveItem("travelTime", i)} className="hover:text-red-500"><FaTrash className="text-[10px]" /></button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-600">Off-Dates (Maintenance)</label>
                                        <div className="flex gap-2">
                                            <input 
                                                type="date" value={newOffDate} onChange={(e) => setNewOffDate(e.target.value)}
                                                className="flex-1 px-4 py-3 bg-slate-50 border-0 rounded-xl outline-none focus:ring-2 focus:ring-rose-500"
                                            />
                                            <button 
                                                type="button" onClick={() => handleAddItem("travelOffDates", newOffDate)}
                                                className="px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors"
                                            >Add</button>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {formData.travelOffDates.map((d, i) => (
                                                <span key={i} className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-sm flex items-center gap-2 font-medium">
                                                    {d} <button type="button" onClick={() => handleRemoveItem("travelOffDates", i)} className="hover:text-red-500"><FaTrash className="text-[10px]" /></button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600">Bus Image</label>
                                    <div className="relative">
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <FaImage className="w-8 h-8 mb-3 text-slate-400" />
                                                    <p className="mb-2 text-sm text-slate-500 font-semibold">
                                                        {imageFile ? imageFile.name : "Click to upload bus image"}
                                                    </p>
                                                    <p className="text-xs text-slate-400">PNG, JPG or JPEG (MAX. 800x400px)</p>
                                                </div>
                                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Route Selection */}
                    <div className="space-y-8 h-full">
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md flex flex-col h-full sticky top-6">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-800">
                                <FaMapMarkerAlt className="text-emerald-500" /> Route Configuration
                            </h2>
                            
                            <div className="space-y-8 flex-1">
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Departure Points</label>
                                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                        {locations.map((loc: any) => (
                                            <label key={loc.id} className="flex items-center p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors group">
                                                <input 
                                                    type="checkbox" 
                                                    checked={formData.departureLocation.includes(loc.name)}
                                                    onChange={() => handleLocationToggle("departureLocation", loc.name)}
                                                    className="w-5 h-5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 transition-all mr-3"
                                                />
                                                <span className="text-slate-600 group-hover:text-emerald-700 font-medium">{loc.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Destination Points</label>
                                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                        {locations.map((loc: any) => (
                                            <label key={loc.id} className="flex items-center p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors group">
                                                <input 
                                                    type="checkbox" 
                                                    checked={formData.destinationLocation.includes(loc.name)}
                                                    onChange={() => handleLocationToggle("destinationLocation", loc.name)}
                                                    className="w-5 h-5 rounded border-slate-300 text-blue-500 focus:ring-blue-500 transition-all mr-3"
                                                />
                                                <span className="text-slate-600 group-hover:text-blue-700 font-medium">{loc.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full mt-10 py-4 bg-main text-white rounded-2xl font-bold text-lg shadow-xl shadow-main/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Creating...
                                    </span>
                                ) : "Launch Bus Service"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBus;
