import { useState, useEffect } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import Swal from "sweetalert2";
import useAuth from "@/Hooks/useAuth";
import { IoBus, IoLocationSharp, IoTime } from "react-icons/io5";
import { MdOutlineTour, MdDirectionsBusFilled } from "react-icons/md";
import { FaBus, FaMoneyBillWave, FaRegMoneyBillAlt, FaUserCircle, FaCalendarAlt } from "react-icons/fa";
import { useGetBusServicesQuery, useDeleteBusServiceMutation } from "@/app/features/travel/travelApi";
import { Link, useNavigate } from "react-router-dom";

const MyBusServices = () => {
  const navigate = useNavigate();
  const [selectedBus, setSelectedBus] = useState<any>(null);
  const { user } = useAuth()! as any;

  const { data: busServicesRes, isLoading } = useGetBusServicesQuery(undefined);
  const [deleteBus] = useDeleteBusServiceMutation();
  const buses = busServicesRes?.data || [];

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBus(id).unwrap();
          Swal.fire("Deleted!", "Bus service has been removed.", "success");
        } catch (err: any) {
          Swal.fire("Error", err?.data?.message || "Failed to delete bus", "error");
        }
      }
    });
  };

  const handleUpdate = (id: number) => {
      navigate(`/dashboard/update-bus-service/${id}`);
  };

  const handleOpenModal = (bus: any) => {
    setSelectedBus(bus);
  };

  useEffect(() => {
    if (selectedBus) {
      const modal = document.getElementById("busDetailsModal") as HTMLDialogElement | null;
      if (modal) {
        modal.showModal();
      }
    }
  }, [selectedBus]);

  if (isLoading) return (
      <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
              <h2 className="text-3xl font-bold text-slate-800">My Bus Services</h2>
              <p className="text-slate-500">Manage and monitor your active bus routes</p>
          </div>
          <Link 
            to="/dashboard/add-bus-service"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
              <FaPlus /> Add New Bus
          </Link>
      </div>

      {buses?.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-3xl border border-slate-100 shadow-sm">
            <IoBus className="text-6xl text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No bus services added yet.</p>
            <Link to="/dashboard/add-bus-service" className="text-emerald-500 font-semibold hover:underline mt-2 inline-block">Start by adding your first bus</Link>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-slate-50/50">
                <tr className="text-slate-600 border-b border-slate-100">
                  <th className="py-5 px-6">Bus Info</th>
                  <th>Route</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {buses.map((bus: any) => (
                  <tr key={bus.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                                <FaBus className="text-xl" />
                            </div>
                            <div>
                                <div className="font-bold text-slate-800">{bus.name}</div>
                                <div className="text-xs text-slate-500">{bus.email}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="text-sm">
                            <div className="flex items-center gap-1 text-slate-700">
                                <span className="font-semibold">{bus.departureLocation?.[0] || "N/A"}</span>
                                <span className="text-slate-400">→</span>
                                <span className="font-semibold">{bus.destinationLocation?.[0] || "N/A"}</span>
                            </div>
                            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                <IoTime className="text-[10px]" /> {bus.travelTime?.[0] || "No time set"}
                            </div>
                        </div>
                    </td>
                    <td>
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${bus.busType === 'AC' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                            {bus.busType}
                        </span>
                    </td>
                    <td>
                        <div className="font-bold text-emerald-600 text-lg">{bus.price}৳</div>
                        <div className="text-[10px] text-slate-400">per seat</div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenModal(bus)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors title='Details'"
                        >
                          <TbListDetails className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleUpdate(bus.id)}
                          className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors title='Edit'"
                        >
                          <FaEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDelete(bus.id)}
                          className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors title='Delete'"
                        >
                          <RiDeleteBin5Fill className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <dialog id="busDetailsModal" className="modal modal-bottom sm:modal-middle">
        {selectedBus && (
          <div className="modal-box max-w-4xl p-0 overflow-hidden bg-white rounded-3xl shadow-2xl">
            {/* Header */}
            <div className="bg-emerald-500 p-8 text-white relative">
              <form method="dialog">
                <button className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors">✕</button>
              </form>
              <div className="flex items-center gap-4">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                      <IoBus className="text-3xl" />
                  </div>
                  <div>
                      <h3 className="text-2xl font-bold">{selectedBus.name}</h3>
                      <p className="opacity-80 flex items-center gap-2 mt-1">
                          <FaUserCircle /> {selectedBus.email}
                      </p>
                  </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left side - Image */}
                <div className="h-64 lg:h-full bg-slate-100 relative">
                  <img
                    src={selectedBus?.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800"}
                    alt="Bus"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 flex gap-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-emerald-600 text-xs font-bold flex items-center gap-1">
                          <FaBus /> {selectedBus.busType}
                      </span>
                      <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-indigo-600 text-xs font-bold flex items-center gap-1">
                          <IoTime /> {selectedBus.totalSeats} Seats
                      </span>
                  </div>
                </div>

                {/* Right side - Details */}
                <div className="p-8 space-y-6">
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Route Overview</h4>
                        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl relative overflow-hidden">
                            <div className="flex flex-col items-center gap-1 pt-1">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <div className="w-0.5 h-10 border-l-2 border-dashed border-emerald-200"></div>
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            </div>
                            <div className="flex-1 space-y-6 pt-0.5">
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">From</p>
                                    <p className="font-bold text-slate-800">{selectedBus.departureLocation?.[0] || 'Unknown'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">To</p>
                                    <p className="font-bold text-slate-800">{selectedBus.destinationLocation?.[0] || 'Unknown'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-2xl">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Price</p>
                            <p className="text-xl font-bold text-emerald-600">{selectedBus.price}৳</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Contact</p>
                            <p className="text-sm font-bold text-slate-800">{selectedBus.contact}</p>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-100">
                        <div className="flex flex-wrap gap-2">
                            {selectedBus.travelTime?.map((time: string, i: number) => (
                                <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium flex items-center gap-1">
                                    <IoTime className="text-[10px]" /> {time}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-slate-50/50 flex justify-end">
                <form method="dialog">
                    <button className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold text-sm hover:bg-slate-900 transition-colors shadow-lg shadow-slate-200">
                        Close Details
                    </button>
                </form>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default MyBusServices;
