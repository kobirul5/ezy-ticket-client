import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import travelBannerImage from "@/assets/Travel_image/travel-service/bg-bus.jpg";
import useCurrentUser from "@/Hooks/useCurrentUser";
import useAuth from "@/Hooks/useAuth";
import useTravelContext from "@/Hooks/TrevalHook/useTravelContext";
import { useCreateOrderMutation } from "@/app/features/order/orderApi";
import Swal from "sweetalert2";
import { useGetScheduleByIdQuery } from "@/app/features/travel/travelApi";
import { motion, AnimatePresence } from "framer-motion";
import { 
    PiSteeringWheelBold, 
    PiChairFill, 
    PiInfoBold, 
    PiArrowLeftBold,
    PiNavigationArrowBold,
    PiMapPinFill,
    PiCalendarBlankFill,
    PiClockFill,
    PiUserBold,
    PiPhoneBold,
    PiEnvelopeBold,
    PiHouseBold,
    PiCheckCircleFill
} from "react-icons/pi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const TravelSelectSet = () => {
    const { tran_id } = useParams();
    const isVirtual = tran_id?.startsWith("virtual-");
    
    const { data: scheduleRes, isLoading: isScheduleLoading } = useGetScheduleByIdQuery(tran_id, {
        skip: !tran_id || isVirtual
    });
    console.log(scheduleRes, "--------------------------------");

    const { user, darkMode } = useAuth() as any;
    const [currentUser] = useCurrentUser() as any;
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const { setBusPassengerData } = useTravelContext() as any;
    const location = useLocation();

    const scheduleData = scheduleRes?.data;

    const busData = scheduleData ? {
        ...scheduleData.busService,
        ...scheduleData,
        busName: scheduleData.busService.name,
        departure: scheduleData.time,
        from: location?.state?.from || scheduleData.busService.departureLocation?.[0],
        to: location?.state?.to || scheduleData.busService.destinationLocation?.[0],
        date: location?.state?.date || ""
    } : location?.state;

    const seatPrice = busData?.price || 0;
    const bookedSeats = busData?.bookedSeats || [];
    const totalSeats = 52; // Hardcoded for this layout
    
    const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();

    if (!isVirtual && isScheduleLoading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-dark-background" : "bg-gray-50"}`}>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <span className={`loading loading-spinner loading-lg ${darkMode ? "text-dark-accent" : "text-main"}`}></span>
                    <p className={`${darkMode ? "text-dark-secondary" : "text-gray-500"} font-medium`}>Loading your journey...</p>
                </motion.div>
            </div>
        );
    }

    const handleSeatSelect = (seat: string) => {
        setSelectedSeats((prevSeats) => {
            if (prevSeats.includes(seat)) {
                return prevSeats.filter((s) => s !== seat);
            }
            if (prevSeats.length >= 4) {
                Swal.fire({
                    title: "Limit Reached",
                    text: "You can only select up to 4 seats.",
                    icon: "info",
                    confirmButtonColor: "#53b17a"
                });
                return prevSeats;
            }
            return [...prevSeats, seat];
        });
    };

    const handleTravelInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as any;
        const name = form.name.value;
        const email = form.email.value;
        const number = form.number.value;
        const address = form.address.value;

        const currentSeatPrice = seatPrice;
        const serviceFeeValue = selectedSeats.length * currentSeatPrice * 0.05;
        const totalPrices = selectedSeats.length * currentSeatPrice + serviceFeeValue;
        
        const passengerData = {
            verifyData: "bus",
            busPostId: busData?.id,
            name,
            email,
            number,
            selectedSeats,
            address,
            totalPrices,
            seatPrice: currentSeatPrice,
            routeAndDateAndTime: { 
                from: busData?.from, 
                to: busData?.to, 
                date: busData?.date, 
                time: busData?.departure 
            },
            buyDate: new Date(),
            total_amount: totalPrices,
            cus_name: name,
            cus_email: email,
            cus_phone: number,
            cus_add1: address,
            productName: `Bus Ticket: ${busData?.busName || "Trip"}`
        };

        try {
            setBusPassengerData(passengerData);
            const res = await createOrder(passengerData).unwrap();
            const paymentUrl = res?.data?.url || (res as any)?.url;
            
            if (paymentUrl) {
                // Using SSLCommerz Gateway direct redirect
                window.location.replace(paymentUrl);
            } else {
                Swal.fire("Error", "Payment link could not be generated", "error");
            }
        } catch (err: any) {
            const errorMessage = err?.data?.message || err?.message || "Failed to process order";
            Swal.fire("Error", errorMessage, "error");
        }
    };

    const serviceFeeValue = selectedSeats.length * seatPrice * 0.05;
    const totalPriceValue = selectedSeats.length * seatPrice + serviceFeeValue;

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-dark-background" : "bg-gray-50"}`}>
            {/* Hero Section */}
            <div className="relative h-[450px] w-full overflow-hidden">
                <motion.div 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${travelBannerImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
                
                <div className="container mx-auto h-full flex flex-col justify-end pb-12 px-6 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
                    >
                        <div>
                            <Link 
                                to="/travel/bus-ticket-book" 
                                className={`inline-flex items-center gap-2 text-white/80 transition-colors group ${darkMode ? "hover:text-dark-accent" : "hover:text-main"} mb-6`}
                            >
                                <PiArrowLeftBold className="group-hover:-translate-x-1 transition-transform" />
                                <span>Back to search</span>
                            </Link>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                                {busData?.busName}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-white/90">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                    <PiMapPinFill className={darkMode ? "text-dark-accent" : "text-main"} />
                                    <span>{busData?.from} — {busData?.to}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                    <PiCalendarBlankFill className={darkMode ? "text-dark-accent" : "text-main"} />
                                    <span>{busData?.date || "Selected Date"}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                    <PiClockFill className={darkMode ? "text-dark-accent" : "text-main"} />
                                    <span>{busData?.departure}</span>
                                </div>
                            </div>
                        </div>
                        
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link 
                                to="/travel/bus-ticket-book" 
                                className={`${darkMode ? "bg-dark-accent hover:bg-green-600" : "bg-main hover:bg-green-600"} text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-main/30 transition-all flex items-center gap-2`}
                            >
                                <PiNavigationArrowBold />
                                Modify Search
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <main className="container mx-auto px-6 py-12 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Seat Selection */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Stats Bar */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className={`p-4 rounded-2xl shadow-sm border text-center ${darkMode ? "bg-dark-surface border-dark-border" : "bg-white border-gray-100"}`}>
                                <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Total</p>
                                <p className={`text-2xl font-black ${darkMode ? "text-dark-primary" : "text-gray-800"}`}>{totalSeats}</p>
                            </div>
                            <div className={`p-4 rounded-2xl shadow-sm border text-center ${darkMode ? "bg-dark-surface border-dark-border" : "bg-white border-gray-100"}`}>
                                <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Booked</p>
                                <p className="text-2xl font-black text-red-500">{bookedSeats.length}</p>
                            </div>
                            <div className={`p-4 rounded-2xl shadow-sm border text-center ${darkMode ? "bg-dark-surface border-dark-border" : "bg-white border-gray-100"}`}>
                                <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Available</p>
                                <p className={`text-2xl font-black ${darkMode ? "text-dark-accent" : "text-main"}`}>{totalSeats - bookedSeats.length}</p>
                            </div>
                        </div>

                        {/* Bus Layout */}
                        <div className={`p-8 rounded-3xl shadow-xl border ${darkMode ? "bg-dark-surface border-dark-border" : "bg-white border-gray-100"}`}>
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? "bg-dark-accent/10" : "bg-main/10"}`}>
                                        <PiChairFill className={`text-xl ${darkMode ? "text-dark-accent" : "text-main"}`} />
                                    </div>
                                    <h2 className={`text-xl font-bold ${darkMode ? "text-dark-primary" : "text-gray-800"}`}>Choose Your Seats</h2>
                                </div>
                                
                                <div className="flex gap-4 text-xs font-semibold">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-4 h-4 rounded border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"}`}></div>
                                        <span className={darkMode ? "text-dark-secondary" : "text-gray-600"}>Available</span>
                                    </div>
                                    <div className={`w-4 h-4 rounded shadow-sm ${darkMode ? "bg-dark-accent" : "bg-main"}`}></div>
                                    <span className={darkMode ? "text-dark-secondary" : "text-gray-600"}>Selected</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-[8px] text-red-500 font-black">X</div>
                                        <span className={darkMode ? "text-dark-secondary" : "text-gray-600"}>Booked</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`max-w-md mx-auto relative p-8 rounded-[40px] border-x-4 ${darkMode ? "bg-gray-900/20 border-gray-800" : "bg-gray-50/50 border-gray-200"}`}>
                                {/* Steering Wheel (Front) */}
                                <div className="flex justify-end mb-12 opacity-40">
                                    <div className={`p-3 border-2 border-dashed rounded-full ${darkMode ? "border-gray-600" : "border-gray-400"}`}>
                                        <PiSteeringWheelBold className={`text-4xl ${darkMode ? "text-gray-500" : "text-gray-500"}`} />
                                    </div>
                                </div>

                                {/* Seat Grid */}
                                <div className="grid grid-cols-5 gap-y-6 gap-x-2">
                                    {[..."ABCDEFGHIJ"].map((row) => (
                                        <React.Fragment key={row}>
                                            {[1, 2].map((num) => {
                                                const seatId = `${row}${num}`;
                                                const isBooked = bookedSeats.includes(seatId);
                                                const isSelected = selectedSeats.includes(seatId);
                                                return (
                                                    <motion.button
                                                        key={seatId}
                                                        whileHover={!isBooked ? { scale: 1.1, y: -2 } : {}}
                                                        whileTap={!isBooked ? { scale: 0.9 } : {}}
                                                        onClick={() => handleSeatSelect(seatId)}
                                                        disabled={isBooked}
                                                        className={`relative h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300
                                                            ${isBooked ? (darkMode ? "bg-red-900/10 text-red-300 border-red-900/20" : "bg-red-50 text-red-300 border-red-100") + " cursor-not-allowed border" : 
                                                              isSelected ? (darkMode ? "bg-dark-accent border-green-700" : "bg-main border-green-700") + " text-white shadow-lg shadow-main/40 border-b-4" : 
                                                              (darkMode ? "bg-dark-background text-dark-secondary border-dark-border" : "bg-white text-gray-600 border-gray-200") + " border shadow-sm hover:text-main"}
                                                        `}
                                                    >
                                                        {isBooked ? (
                                                            <span className="text-[10px] uppercase opacity-40">Sold</span>
                                                        ) : (
                                                            <span>{seatId}</span>
                                                        )}
                                                        {isSelected && (
                                                            <motion.div 
                                                                layoutId={`checked-${seatId}`}
                                                                className={`absolute -top-1 -right-1 rounded-full ${darkMode ? "bg-white text-dark-accent" : "bg-white text-main"}`}
                                                            >
                                                                <PiCheckCircleFill className="text-sm" />
                                                            </motion.div>
                                                        )}
                                                    </motion.button>
                                                );
                                            })}
                                            
                                            {/* Aisle */}
                                            <div className={`flex items-center justify-center opacity-10 font-bold select-none text-xs tracking-tighter ${darkMode ? "text-dark-primary" : "text-gray-800"}`}>
                                                {row}
                                            </div>

                                            {[3, 4].map((num) => {
                                                const seatId = `${row}${num}`;
                                                const isBooked = bookedSeats.includes(seatId);
                                                const isSelected = selectedSeats.includes(seatId);
                                                return (
                                                    <motion.button
                                                        key={seatId}
                                                        whileHover={!isBooked ? { scale: 1.1, y: -2 } : {}}
                                                        whileTap={!isBooked ? { scale: 0.9 } : {}}
                                                        onClick={() => handleSeatSelect(seatId)}
                                                        disabled={isBooked}
                                                        className={`relative h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300
                                                            ${isBooked ? (darkMode ? "bg-red-900/10 text-red-300 border-red-900/20" : "bg-red-50 text-red-300 border-red-100") + " cursor-not-allowed border" : 
                                                              isSelected ? (darkMode ? "bg-dark-accent border-green-700" : "bg-main border-green-700") + " text-white shadow-lg shadow-main/40 border-b-4" : 
                                                              (darkMode ? "bg-dark-background text-dark-secondary border-dark-border" : "bg-white text-gray-600 border-gray-200") + " border shadow-sm hover:text-main"}
                                                        `}
                                                    >
                                                        {isBooked ? (
                                                            <span className="text-[10px] uppercase opacity-40">Sold</span>
                                                        ) : (
                                                            <span>{seatId}</span>
                                                        )}
                                                        {isSelected && (
                                                            <motion.div 
                                                                layoutId={`checked-${seatId}`}
                                                                className={`absolute -top-1 -right-1 rounded-full ${darkMode ? "bg-white text-dark-accent" : "bg-white text-main"}`}
                                                            >
                                                                <PiCheckCircleFill className="text-sm" />
                                                            </motion.div>
                                                        )}
                                                    </motion.button>
                                                );
                                            })}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Panel */}
                    <div className="lg:col-span-4 sticky top-24 space-y-6">
                        <div className={`rounded-3xl shadow-xl overflow-hidden border ${darkMode ? "bg-dark-surface border-dark-border" : "bg-white border-gray-100"}`}>
                            <div className={`p-6 border-b ${darkMode ? "bg-dark-accent/10 border-dark-border" : "bg-main/10 border-gray-100"}`}>
                                <h3 className={`text-lg font-bold flex items-center gap-2 ${darkMode ? "text-dark-primary" : "text-gray-800"}`}>
                                    <PiInfoBold className={darkMode ? "text-dark-accent" : "text-main"} />
                                    Selection Summary
                                </h3>
                            </div>
                            
                            <div className="p-6 space-y-6">
                                <AnimatePresence mode="popLayout">
                                    {selectedSeats.length > 0 ? (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="space-y-4"
                                        >
                                            <div className="flex flex-wrap gap-2">
                                                {selectedSeats.map((seat) => (
                                                    <motion.span 
                                                        key={seat}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className={`px-3 py-1 border rounded-lg text-sm font-bold flex items-center gap-1 ${darkMode ? "bg-dark-accent/10 text-dark-accent border-dark-accent/20" : "bg-main/10 text-main border-main/20"}`}
                                                    >
                                                        <PiChairFill />
                                                        {seat}
                                                    </motion.span>
                                                ))}
                                            </div>
                                            
                                            <div className="space-y-3 pt-4 border-t border-dashed dark:border-gray-700">
                                                <div className={`flex justify-between text-sm ${darkMode ? "text-dark-secondary" : "text-gray-500"}`}>
                                                    <span>Price ({selectedSeats.length} Seats)</span>
                                                    <span className={`font-bold flex items-center gap-1 ${darkMode ? "text-dark-primary" : "text-gray-800"}`}>
                                                        <FaBangladeshiTakaSign className="text-xs" />
                                                        {selectedSeats.length * seatPrice}
                                                    </span>
                                                </div>
                                                <div className={`flex justify-between text-sm ${darkMode ? "text-dark-secondary" : "text-gray-500"}`}>
                                                    <span>Service Fee (5%)</span>
                                                    <span className={`font-bold flex items-center gap-1 ${darkMode ? "text-dark-primary" : "text-gray-800"}`}>
                                                        <FaBangladeshiTakaSign className="text-xs" />
                                                        {serviceFeeValue.toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className={`flex justify-between text-lg font-black pt-2 ${darkMode ? "text-dark-accent" : "text-main"}`}>
                                                    <span>Total Amount</span>
                                                    <span className="flex items-center gap-1">
                                                        <FaBangladeshiTakaSign className="text-base" />
                                                        {totalPriceValue.toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="py-8 text-center space-y-3">
                                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                                                <PiChairFill className={`text-3xl ${darkMode ? "text-gray-600" : "text-gray-300"}`} />
                                            </div>
                                            <p className="text-sm text-gray-400 font-medium">No seats selected yet</p>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <form onSubmit={handleTravelInfo} className={`p-6 border-t space-y-4 ${darkMode ? "bg-gray-800/30 border-dark-border" : "bg-gray-50/50 border-gray-100"}`}>
                                <h4 className="text-xs uppercase tracking-widest font-black text-gray-400 mb-2">Passenger Details</h4>
                                
                                <div className="space-y-4">
                                    <div className="relative">
                                        <PiUserBold className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={currentUser?.name}
                                            className={`w-full border rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-main/20 outline-none transition-all px-5 ${darkMode ? "bg-dark-surface border-dark-border text-dark-primary focus:border-dark-accent" : "bg-white border-gray-200 focus:border-main"}`}
                                            placeholder="Full Name"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="relative opacity-60">
                                        <PiEnvelopeBold className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={user?.email || ""}
                                            readOnly
                                            className={`w-full border rounded-xl pl-10 pr-4 py-3 text-sm cursor-not-allowed px-5 ${darkMode ? "bg-gray-800 border-dark-border text-dark-primary" : "bg-gray-100 border-gray-200"}`}
                                            placeholder="Registered Email"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <PiPhoneBold className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="number"
                                            defaultValue={currentUser?.phone}
                                            className={`w-full border rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-main/20 outline-none transition-all px-5 ${darkMode ? "bg-dark-surface border-dark-border text-dark-primary focus:border-dark-accent" : "bg-white border-gray-200 focus:border-main"}`}
                                            placeholder="Phone Number"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <PiHouseBold className="absolute left-3 top-3 text-gray-400" />
                                        <textarea
                                            name="address"
                                            defaultValue={currentUser?.address}
                                            rows={2}
                                            className={`w-full border rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-main/20 outline-none transition-all px-5 ${darkMode ? "bg-dark-surface border-dark-border text-dark-primary focus:border-dark-accent" : "bg-white border-gray-200 focus:border-main"}`}
                                            placeholder="Your Address"
                                            required
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={selectedSeats.length === 0 || isCreatingOrder}
                                    className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all
                                        ${selectedSeats.length > 0 
                                            ? (darkMode ? "bg-dark-accent hover:bg-green-600" : "bg-main hover:bg-green-600") + " text-white shadow-xl shadow-main/30" 
                                            : (darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-400") + " cursor-not-allowed"}
                                    `}
                                >
                                    {isCreatingOrder ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        "Proceed to Payment"
                                    )}
                                </motion.button>
                                
                                <p className="text-[10px] text-center text-gray-500 dark:text-gray-400 mt-2 px-4">
                                    By proceeding, you agree to our <Link to="/travel/Bus-Ticket-Cancellation-policy" className={`hover:underline ${darkMode ? "text-dark-accent" : "text-main"}`}>Terms & Conditions</Link>
                                </p>
                            </form>
                        </div>
                        
                        <div className={`border p-4 rounded-2xl flex gap-3 ${darkMode ? "bg-amber-900/10 border-amber-900/20" : "bg-amber-50 border-amber-100"}`}>
                            <PiInfoBold className="text-amber-500 text-xl shrink-0" />
                            <p className={`text-xs leading-relaxed ${darkMode ? "text-amber-200/70" : "text-amber-800"}`}>
                                <strong>Cancellation Policy:</strong> 50% refund up to 6 hours before departure. No refunds after that timeframe.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TravelSelectSet;
