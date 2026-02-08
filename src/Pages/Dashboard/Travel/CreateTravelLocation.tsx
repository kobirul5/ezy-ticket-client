import { useState } from "react";
import { FaMapMarkerAlt, FaMapMarkedAlt, FaPlus, FaArrowLeft } from "react-icons/fa";
import { useCreateTravelLocationMutation } from "@/app/features/travel/travelApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateTravelLocation = () => {
    const navigate = useNavigate();
    const [createLocation, { isLoading }] = useCreateTravelLocationMutation();
    const [formData, setFormData] = useState({
        name: "",
        address: ""
    });

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
                confirmButtonColor: "#34d399"
            });
            navigate("/dashboard/add-bus-service"); // Navigate back to bus creation or local list
        } catch (err: any) {
            Swal.fire("Error", err?.data?.message || "Failed to add location", "error");
        }
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-main transition-colors mb-6 group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back
                </button>

                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-200">
                        <FaMapMarkerAlt className="text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Add Travel Location</h1>
                        <p className="text-slate-500">Register new terminals, stands, or stops</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-600">Location Name</label>
                            <div className="relative">
                                <FaMapMarkedAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    name="name" value={formData.name} onChange={handleChange} required
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none" 
                                    placeholder="e.g. Mohakhali Bus Terminal"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-600">Full Address</label>
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    name="address" value={formData.address} onChange={handleChange} required
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none" 
                                    placeholder="e.g. Mohakhali, Dhaka 1212"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-emerald-100 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <><FaPlus /> Add Location</>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                    <h3 className="text-amber-800 font-semibold mb-2">Pro Tip</h3>
                    <p className="text-amber-700 text-sm leading-relaxed">
                        Accurate names and addresses help users find their buses easily. Use the specific terminal name as the "Name" (e.g., Gabtoli) and the full location details in the "Address".
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreateTravelLocation;
