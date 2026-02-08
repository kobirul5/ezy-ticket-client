import { useState, useEffect } from "react";
import { FaBus, FaEnvelope, FaPhone, FaTags, FaUsers, FaMoneyBillWave, FaClock, FaCalendarAlt, FaMapMarkerAlt, FaImage, FaTrash, FaArrowLeft, FaSave, FaPlus } from "react-icons/fa";
import { useGetBusByIdQuery, useUpdateBusServiceMutation, useGetTravelLocationsQuery } from "@/app/features/travel/travelApi";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateBus = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: busRes, isLoading: busLoading } = useGetBusByIdQuery(id);
    const [updateBus, { isLoading: isUpdating }] = useUpdateBusServiceMutation();
    const { data: locationsRes } = useGetTravelLocationsQuery(undefined);
    const locations = locationsRes?.data || [];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        busType: "NON_AC",
        totalSeats: 52,
        price: 350,
        travelTime: [] as string[],
        travelOffDates: [] as string[],
        departureLocation: [] as string[],
        destinationLocation: [] as string[]
    });

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (busRes?.data) {
            const bus = busRes.data;
            setFormData({
                name: bus.name,
                email: bus.email,
                contact: bus.contact,
                busType: bus.busType,
                totalSeats: bus.totalSeats,
                price: bus.price,
                travelTime: bus.travelTime || [],
                travelOffDates: bus.travelOffDates?.map((d: any) => new Date(d).toISOString().split('T')[0]) || [],
                departureLocation: bus.departureLocation || [],
                destinationLocation: bus.destinationLocation || []
            });
            if (bus.image) setPreview(bus.image);
        }
    }, [busRes]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleAddItem = (field: "travelTime" | "travelOffDates", value: string) => {
        if (!value) return;
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], value]
        }));
    };

    const handleRemoveItem = (field: "travelTime" | "travelOffDates", index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleLocationToggle = (field: "departureLocation" | "destinationLocation", locationName: string) => {
        setFormData(prev => {
            const current = prev[field];
            if (current.includes(locationName)) {
                return { ...prev, [field]: current.filter(l => l !== locationName) };
            } else {
                return { ...prev, [field]: [...current, locationName] };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const submitData = new FormData();
            submitData.append("data", JSON.stringify({
                ...formData,
                totalSeats: Number(formData.totalSeats),
                price: Number(formData.price)
            }));
            
            if (file) {
                submitData.append("file", file);
            }

            await updateBus({ id, data: submitData }).unwrap();
            
            Swal.fire({
                title: "Success!",
                text: "Bus service updated successfully",
                icon: "success",
                confirmButtonColor: "#10b981"
            });
            navigate("/dashboard/MyBusServices");
        } catch (err: any) {
            Swal.fire("Error", err?.data?.message || "Failed to update bus service", "error");
        }
    };

    if (busLoading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-6xl mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-6 group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to My Buses
                </button>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-200">
                        <FaBus className="text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Update Bus Service</h1>
                        <p className="text-slate-500">Editing: <span className="text-emerald-600 font-semibold">{formData.name}</span></p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Core Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* General Information */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-4">
                                <FaTags className="text-emerald-500" /> General Information
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Bus Name</label>
                                    <div className="relative">
                                        <FaBus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input name="name" value={formData.name} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none" placeholder="e.g. Green Line Paribahan" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Company Email</label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none" placeholder="contact@company.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Contact Number</label>
                                    <div className="relative">
                                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input name="contact" value={formData.contact} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none" placeholder="+880 1XXX XXXXXX" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Bus Type</label>
                                    <select name="busType" value={formData.busType} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none">
                                        <option value="AC">⚡ AC Premium</option>
                                        <option value="NON_AC">🍃 Non-AC Economy</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Total Seats</label>
                                    <div className="relative">
                                        <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="number" name="totalSeats" value={formData.totalSeats} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Ticket Price (BDT)</label>
                                    <div className="relative">
                                        <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Scheduling */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-4">
                                <FaClock className="text-emerald-500" /> Bus Scheduling
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Times */}
                                <div className="space-y-4">
                                    <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                                        Departure Times <span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">Required</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <input type="time" id="timeInput" className="flex-1 px-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none" />
                                        <button type="button" onClick={() => {
                                            const input = document.getElementById('timeInput') as HTMLInputElement;
                                            if (input.value) {
                                                handleAddItem('travelTime', input.value);
                                                input.value = '';
                                            }
                                        }} className="bg-emerald-500 text-white px-4 rounded-xl hover:bg-emerald-600 transition-colors"><FaPlus /></button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {formData.travelTime.map((time, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-bold flex items-center gap-2 animate-in zoom-in-95">
                                                {time} <FaTrash onClick={() => handleRemoveItem('travelTime', i)} className="text-[10px] cursor-pointer hover:text-red-500 transition-colors" />
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Off Dates */}
                                <div className="space-y-4">
                                    <label className="text-sm font-semibold text-slate-600">Maintenance / Off Dates</label>
                                    <div className="flex gap-2">
                                        <input type="date" id="dateInput" className="flex-1 px-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none" />
                                        <button type="button" onClick={() => {
                                            const input = document.getElementById('dateInput') as HTMLInputElement;
                                            if (input.value) {
                                                handleAddItem('travelOffDates', input.value);
                                                input.value = '';
                                            }
                                        }} className="bg-emerald-500 text-white px-4 rounded-xl hover:bg-emerald-600 transition-colors"><FaPlus /></button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {formData.travelOffDates.map((date, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold flex items-center gap-2 animate-in zoom-in-95">
                                                {date} <FaTrash onClick={() => handleRemoveItem('travelOffDates', i)} className="text-[10px] cursor-pointer hover:text-red-500 transition-colors" />
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Route & Image */}
                    <div className="space-y-8 h-full">
                        {/* Image Upload */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-4">
                                <FaImage className="text-emerald-500" /> Bus Image
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="aspect-video bg-slate-50 rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 flex flex-col items-center justify-center relative group">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                    ) : (
                                        <div className="text-center p-6">
                                            <FaImage className="text-4xl text-slate-300 mx-auto mb-2" />
                                            <p className="text-xs text-slate-400">Click to upload bus photo</p>
                                        </div>
                                    )}
                                    <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                </div>
                                <p className="text-[10px] text-slate-400 text-center italic">Supported: JPG, PNG. Recommended 800x450px</p>
                            </div>
                        </div>

                        {/* Route Configuration */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 lg:sticky lg:top-6">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-4">
                                <FaMapMarkerAlt className="text-emerald-500" /> Route Configuration
                            </h3>
                            
                            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {/* Departure */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-emerald-600 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Departure Points
                                    </label>
                                    <div className="space-y-2">
                                        {locations.map((loc: any) => (
                                            <label key={loc.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${formData.departureLocation.includes(loc.name) ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}>
                                                <input type="checkbox" checked={formData.departureLocation.includes(loc.name)} onChange={() => handleLocationToggle('departureLocation', loc.name)} className="checkbox checkbox-emerald rounded-lg" />
                                                <span className="text-sm font-semibold text-slate-700">{loc.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Destination */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-indigo-600 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Destination Points
                                    </label>
                                    <div className="space-y-2">
                                        {locations.map((loc: any) => (
                                            <label key={loc.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${formData.destinationLocation.includes(loc.name) ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}>
                                                <input type="checkbox" checked={formData.destinationLocation.includes(loc.name)} onChange={() => handleLocationToggle('destinationLocation', loc.name)} className="checkbox checkbox-indigo rounded-lg" />
                                                <span className="text-sm font-semibold text-slate-700">{loc.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button type="submit" disabled={isUpdating} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-emerald-100 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                {isUpdating ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <><FaSave /> Update Service</>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBus;
