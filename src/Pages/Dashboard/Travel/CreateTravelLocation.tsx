import { useState } from "react";
import { FaMapMarkerAlt, FaMapMarkedAlt, FaPlus, FaSearch, FaMapPin } from "react-icons/fa";
import { useCreateTravelLocationMutation, useGetTravelLocationsQuery } from "@/app/features/travel/travelApi";
import Swal from "sweetalert2";

const CreateTravelLocation = () => {
    const { data: locationsRes, isLoading: isFetching } = useGetTravelLocationsQuery(undefined);
    const [createLocation, { isLoading: isCreating }] = useCreateTravelLocationMutation();
    const [formData, setFormData] = useState({
        name: "",
        address: ""
    });

    const locations = locationsRes?.data || [];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createLocation(formData).unwrap();
            Swal.fire({
                title: "Location Added!",
                text: "Travel location has been registered successfully",
                icon: "success",
                confirmButtonColor: "#34d399",
                timer: 2000
            });
            setFormData({ name: "", address: "" });
        } catch (err: any) {
            Swal.fire("Error", err?.data?.message || "Failed to add location", "error");
        }
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto space-y-10">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-main text-white rounded-3xl shadow-lg shadow-main/20">
                            <FaMapMarkerAlt className="text-3xl" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-800 tracking-tight">Location Management</h1>
                            <p className="text-slate-500 font-medium tracking-wide italic">Manage your terminals, stands, and stops</p>
                        </div>
                    </div>
                </div>

                {/* Create Location Card */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-main/5 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700"></div>
                    
                    <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                        <FaPlus className="text-main text-sm" /> Add New Location
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
                        <div className="lg:col-span-2 space-y-2">
                            <label className="text-sm font-bold text-slate-600 ml-1">Location Name</label>
                            <div className="relative">
                                <FaMapMarkedAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-main transition-colors" />
                                <input 
                                    name="name" value={formData.name} onChange={handleChange} required
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-main focus:ring-4 focus:ring-main/10 transition-all outline-none text-slate-700 font-medium" 
                                    placeholder="e.g. Mohakhali Bus Terminal"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-2 space-y-2">
                            <label className="text-sm font-bold text-slate-600 ml-1">Full Address</label>
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-main transition-colors" />
                                <input 
                                    name="address" value={formData.address} onChange={handleChange} required
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-main focus:ring-4 focus:ring-main/10 transition-all outline-none text-slate-700 font-medium" 
                                    placeholder="e.g. Mohakhali, Dhaka 1212"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isCreating}
                            className="w-full py-4 bg-main text-white rounded-2xl font-bold text-lg shadow-xl shadow-main/25 hover:shadow-main/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isCreating ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                "Save Location"
                            )}
                        </button>
                    </form>
                </div>

                {/* Location List Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                            <FaMapPin className="text-main" /> Existing Locations
                            <span className="bg-main/10 text-main text-sm px-4 py-1 rounded-full">{locations.length} Total</span>
                        </h2>
                    </div>

                    {isFetching ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-32 bg-slate-200 animate-pulse rounded-3xl"></div>
                            ))}
                        </div>
                    ) : locations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {locations.map((location: any) => (
                                <div 
                                    key={location.id} 
                                    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-emerald-50 text-main rounded-2xl group-hover:bg-main group-hover:text-white transition-colors duration-300">
                                            <FaMapPin className="text-xl" />
                                        </div>
                                        <div className="space-y-1 flex-1">
                                            <h3 className="text-lg font-bold text-slate-800 leading-tight">{location.name}</h3>
                                            <p className="text-sm text-slate-500 font-medium line-clamp-2">{location.address}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-slate-50 flex justify-end">
                                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic leading-none">
                                            Added {new Date(location.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-slate-200">
                            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaSearch className="text-3xl text-slate-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">No locations found</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">You haven't added any travel locations yet. Use the form above to get started.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateTravelLocation;
