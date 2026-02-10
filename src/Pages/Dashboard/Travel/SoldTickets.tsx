import { useGetMyBusOrdersQuery } from "@/app/features/order/orderApi";
import { useState } from "react";
import { FaEye, FaTimes } from "react-icons/fa";

const SoldTickets = () => {
    const { data: ordersRes, isLoading } = useGetMyBusOrdersQuery(undefined);
    const soldTickets = ordersRes?.data || [];
    const [selectedTicket, setSelectedTicket] = useState<any>(null);

    if (isLoading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-main"></span>
            </div>
        );
    }

    return (
        <div className="mx-auto p-8 bg-white rounded-2xl shadow-xl overflow-hidden relative">
            <div className="mb-8 flex items-center justify-center space-x-3">
                <svg className="w-8 h-8 text-main" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2h2a2 2 0 012 2v6a2 2 0 01-2 2H2a2 2 0 01-2-2v-6a2 2 0 012-2h2V6zm14 2H4V6h12v2zm-4 6a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <h2 className="text-3xl font-bold text-gray-800 ">Sold Tickets History</h2>
            </div>

            <div className="border border-gray-100 rounded-lg overflow-x-scroll shadow-sm">
                <table className="w-full text-base">
                    <thead className="bg-main text-white">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wide text-left first:rounded-tl-lg">#</th>
                            <th className="px-6 py-4 font-semibold tracking-wide text-left">Buyer</th>
                            <th className="px-6 py-4 font-semibold tracking-wide text-left">Transaction ID</th>
                            <th className="px-6 py-4 font-semibold tracking-wide text-center">Seats</th>
                            <th className="px-6 py-4 font-semibold tracking-wide text-right">Total</th>
                            <th className="px-6 py-4 font-semibold tracking-wide text-left">Date</th>
                            <th className="px-6 py-4 font-semibold tracking-wide text-center last:rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {soldTickets.map((ticket: any, index: number) => {
                            const orderDetails = ticket.orderData;
                            return (
                                <tr key={ticket.id} className="hover:bg-emerald-50 transition-colors text-black">
                                    <td className="px-6 py-4 text-gray-500 font-medium">{index + 1}</td>

                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-800">{ticket.customerName}</span>
                                            <span className="text-gray-600">{orderDetails?.cus_phone || orderDetails?.number || "N/A"}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 font-mono text-sm text-gray-500">
                                        {ticket.tranId}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-semibold">
                                            {orderDetails?.selectedSeats?.length || 0} Seats
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-right font-semibold text-main">
                                        {ticket.totalAmount}৳
                                    </td>

                                    <td className="px-6 py-4 min-w-[150px] text-gray-500">
                                        {new Date(ticket.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </td>
                                    
                                    <td className="px-6 py-4 text-center">
                                        <button 
                                            onClick={() => setSelectedTicket(ticket)}
                                            className="p-2 bg-main/10 text-main rounded-lg hover:bg-main hover:text-white transition-all transform hover:scale-110"
                                            title="View Details"
                                        >
                                            <FaEye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Detail Modal */}
            {selectedTicket && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden transform animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="bg-main p-6 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-bold">Booking Details</h3>
                                <p className="text-emerald-100 text-sm opacity-90">Transaction ID: {selectedTicket.tranId}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedTicket(null)}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <FaTimes size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                            {/* Trip Info Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Bus Service</p>
                                    <p className="text-lg font-bold text-gray-800 ">
                                        {selectedTicket.orderData?.productName?.replace("Bus Ticket: ", "") || "Trip Details"}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Route & Timing</p>
                                    <p className="text-md font-semibold text-gray-700">
                                        {selectedTicket.orderData?.routeAndDateAndTime?.from} → {selectedTicket.orderData?.routeAndDateAndTime?.to}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {selectedTicket.orderData?.routeAndDateAndTime?.date} | {selectedTicket.orderData?.routeAndDateAndTime?.time}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Passenger Details */}
                                <div className="space-y-4">
                                    <h4 className="font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                        <div className="w-1.5 h-6 bg-main rounded-full"></div>
                                        Passenger Information
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</p>
                                            <p className="font-medium text-gray-800">{selectedTicket.customerName}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact Detail</p>
                                            <p className="font-medium text-gray-800">{selectedTicket.customerEmail}</p>
                                            <p className="font-medium text-gray-800">{selectedTicket.orderData?.cus_phone || selectedTicket.orderData?.number}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pickup Address</p>
                                            <p className="font-medium text-gray-800">
                                                {selectedTicket.orderData?.cus_add1 || selectedTicket.orderData?.address || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Booking Summary */}
                                <div className="space-y-4">
                                    <h4 className="font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                        <div className="w-1.5 h-6 bg-main rounded-full"></div>
                                        Booking Summary
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Booked Seats</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedTicket.orderData?.selectedSeats?.map((seat: string) => (
                                                    <span key={seat} className="px-3 py-1 bg-main text-white rounded-lg font-bold text-sm shadow-sm">
                                                        {seat}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center px-2">
                                            <span className="text-gray-500">Payment Status</span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedTicket.paidStatus ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {selectedTicket.paidStatus ? "PAID" : "PENDING"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-2 pt-2 border-t">
                                            <span className="text-gray-800 font-bold">Total Amount</span>
                                            <span className="text-2xl font-black text-main">{selectedTicket.totalAmount}৳</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 bg-gray-50 border-t flex justify-end">
                            <button 
                                onClick={() => setSelectedTicket(null)}
                                className="px-8 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors"
                            >
                                Close Detail
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {soldTickets.length === 0 && (
                <div className="py-24 text-center text-gray-400">
                    <div className="bg-gray-50 inline-block p-6 rounded-full mb-4">
                      <svg className="h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <p className="text-xl font-semibold">No tickets sold yet</p>
                    <p className="text-sm mt-1">Transaction history will appear here once customers book tickets.</p>
                </div>
            )}
        </div>
    );
};

export default SoldTickets;
