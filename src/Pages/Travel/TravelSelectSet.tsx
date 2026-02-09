import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import travelBannerImage from "@/assets/Travel_image/travel-service/bg-bus.jpg"
import useCurrentUser from "@/Hooks/useCurrentUser";
import useAuth from "@/Hooks/useAuth";
import useTravelContext from "@/Hooks/TrevalHook/useTravelContext";
import { useCreateOrderMutation } from "@/app/features/order/orderApi";
import Swal from "sweetalert2";

import { useParams } from "react-router-dom";
import { useGetScheduleByIdQuery } from "@/app/features/travel/travelApi";

const TravelSelectSet = () => {
    const { tran_id } = useParams();
    const isVirtual = tran_id?.startsWith("virtual-");
    
    // Fetch data if it's a real ID
    const { data: scheduleRes, isLoading: isScheduleLoading } = useGetScheduleByIdQuery(tran_id, {
        skip: !tran_id || isVirtual
    });

    const { user } = useAuth() as any
    const [currentUser] = useCurrentUser() as any
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const { setBusPassengerData } = useTravelContext() as any
    const location = useLocation()

    // Priority: Fetched Data > Location State
    const scheduleData = scheduleRes?.data; // scheduleRes is the { success, data, ... } object, so scheduleRes.data is the schedule

    const busData = scheduleData ? {
        ...scheduleData.busService,
        ...scheduleData,
        busName: scheduleData.busService.name,
        departure: scheduleData.time,
        from: location?.state?.from || scheduleData.busService.departureLocation?.[0],
        to: location?.state?.to || scheduleData.busService.destinationLocation?.[0],
        date: location?.state?.date || ""
    } : location?.state;

    const seatPrice = busData?.price;
    const { darkMode } = useAuth() as any
    const bookedSeat = busData?.bookedSeats || [];
    
    const [createOrder] = useCreateOrderMutation();

    if (!isVirtual && isScheduleLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    const handleSeatSelect = (seat: string) => {
        setSelectedSeats((prevSeats) => {
            if (prevSeats.includes(seat)) {
                return prevSeats.filter((s) => s !== seat);
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

        // Defensive checks for price
        const currentSeatPrice = seatPrice || 0;
        const totalPrices = selectedSeats.length * currentSeatPrice * 1.05; // 5% charge
        const busPostId = busData?.id
        const verifyData = "bus"
        const routeAndDateAndTime = { from: busData?.from, to: busData?.to, date: busData?.date, time: busData?.departure }
        const buyDate = new Date()

        if (!name || !email || !number || !address) {
            Swal.fire("Warning", "Please fill in all passenger details", "warning");
            return;
        }

        if (selectedSeats.length < 1) {
            Swal.fire("Warning", "Please select at least one seat", "warning");
            return;
        }

        const passengerData = {
            verifyData,
            busPostId,
            name,
            email, // Use form email (which is now read-only/registered user email)
            number,
            selectedSeats,
            address,
            totalPrices,
            seatPrice: currentSeatPrice,
            routeAndDateAndTime,
            buyDate,
            // Fields for backend order creation
            total_amount: totalPrices,
            cus_name: name,
            cus_email: email, // This satisfies the Order -> User FK constraint
            cus_phone: number,
            cus_add1: address,
            productName: `Bus Ticket: ${busData?.busName || "Trip"}`
        }

        console.log("Submitting passenger data to SSLCommerz flow:", passengerData);

        try {
            setBusPassengerData(passengerData)
            const res = await createOrder(passengerData).unwrap();
            console.log("Order creation response:", res);

            // Accessing URL based on backend response shape { success: true, data: { url: ... } }
            const paymentUrl = res?.data?.url || (res as any)?.url;
            
            if (paymentUrl) {
                window.location.replace(paymentUrl);
            } else {
                console.error("No payment URL in response:", res);
                Swal.fire("Error", "Payment link could not be generated", "error");
            }
        } catch (err: any) {
            console.error("Order error:", err);
            const errorMessage = err?.data?.message || err?.message || "Failed to process order";
            Swal.fire("Error", errorMessage, "error");
        }
    }

    return (
        <>
            <div
                className="relative hero min-h-[400px] flex items-center justify-center w-full "
                style={{
                    backgroundImage: `url(${travelBannerImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 "></div>
                <div className=" relative z-10 container mx-auto">
                    <div className="flex flex-col lg:flex-row justify-center gap-10 lg:justify-between px-5 mt-10">
                        <div className="text-left ">
                            <h1 className="text-main mt-8 text-2xl md:text-3xl lg:text-5xl mb-5  font-bold">{busData?.busName}</h1>
                            <p className="text-white">From: {busData?.from}</p>
                            <p className="text-white">To: {busData?.to}</p>
                        </div>
                        <div>
                            <Link to={"/travel/bus-ticket-book"} className="btn bg-main shadow-none border-none text-white">Modify Search</Link>
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-20 flex justify-between px-5 text-supporting">
                        <p>Total Seat: {52}</p>
                        <p>Booked Seat: {bookedSeat ? bookedSeat.length : 0}</p>
                        <p>Available Seat: {bookedSeat ? 52 - bookedSeat.length : 0}</p>
                    </div>
                </div>
            </div>
            <section className="container mx-auto my-20 px-5 ">
                <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                    {/* Seat Selection Grid */}
                    <div className={`  ${darkMode ? "bg-[#1d1d1d] text-white" : "text-[#111111] bg-white"} p-6 rounded-lg shadow-2xl col-span-2 `}>
                        <h2 className="text-lg font-semibold mb-4">Select Your Seat</h2>
                        {/* Legend */}
                        <div className="flex items-center justify-between space-x-4 mb-6">
                            <div className="flex items-center space-x-2">
                                <span className="w-6 h-6 bg-gray-200 rounded"></span>
                                <span>Available</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="w-6 h-6 bg-main rounded"></span>
                                <span>Selected</span>
                            </div>
                        </div>

                        {/* Seat Grid */}
                        <div className="grid grid-cols-6 gap-4">
                            {[..."ABCDEFGHIJ"].map((row, idx) => (
                                <React.Fragment key={idx}>
                                    <p key={idx} className="flex text-center items-center justify-center">{row}</p>
                                    {[1, 2, null, 3, 4].map((num, index) => (
                                        num ? (
                                            <button
                                                disabled={bookedSeat?.includes(`${row}${num}`) ||
                                                    (selectedSeats.length >= 4 && !selectedSeats.includes(`${row}${num}`))
                                                }
                                                key={`${row}${num}`}
                                                onClick={() => handleSeatSelect(`${row}${num}`)}
                                                className={`btn rounded ${selectedSeats.includes(`${row}${num}`)
                                                    ? "bg-main"
                                                    : `${!darkMode && "bg-gray-200"}  hover:bg-main `
                                                    } ${darkMode && ` bg-dark-surface  text-white border-main `} ${bookedSeat?.includes(`${row}${num}`) && "text-[10px] md:text-[16px]"}`}
                                            >
                                                {bookedSeat?.includes(`${row}${num}`) ? "Booked" : `${row}${num}`}
                                            </button>
                                        ) : (
                                            <p key={`${row}-empty-${index}`}></p>
                                        )
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Seat Details and Form */}
                    <div className={`  ${darkMode ? "bg-[#1d1d1d] text-white" : "text-[#111111] bg-white"} p-6 rounded-lg  col-span-1 shadow-2xl `}>
                        <h2 className="text-lg font-semibold mb-4">Selected Your Seat</h2>
                        <div className={`mb-6 ${darkMode && ` bg-dark-surface  text-whit `} rounded-2xl p-8`}>
                            <div className="flex justify-between py-2 font-semibold">
                                <div>
                                    <span>Seat</span>
                                    <span className="p-1 bg-main text-white rounded-md ml-2">
                                        {selectedSeats.length}
                                    </span>
                                </div>
                                <span>Price</span>
                            </div>
                            <div className="mb-6 border-t-2 border-dashed">
                                {selectedSeats.map((seat) => (
                                    <div key={seat} className="flex justify-between py-2">
                                        <span>{seat}</span>
                                        <span>BDT {seatPrice}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Total Price */}
                            <div className="flex justify-between border-t-2 pt-4 mt-4">
                                <span>Total Seat Price</span>
                                <p>
                                    <span>BDT </span>
                                    <span>{selectedSeats.length * seatPrice}</span>
                                </p>
                            </div>
                            <div className="flex justify-between pt-4">
                                <span>Service Fee {"(5%)"}</span>
                                <p>
                                    <span>BDT </span>
                                    <span>{selectedSeats.length * seatPrice * 0.05}</span>
                                </p>
                            </div>
                            <div className="flex justify-between border-t-2 pt-4 mt-4">
                                <span>Total Price</span>
                                <p>
                                    <span>BDT </span>
                                    <span>{selectedSeats.length * seatPrice * 0.05 + selectedSeats.length * seatPrice}</span>
                                </p>
                            </div>
                        </div>
                        {/* Form */}
                        <form onSubmit={handleTravelInfo} className="mt-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Passenger Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={currentUser?.name}
                                    className={`w-full border input border-gray-300 rounded-lg px-4 py-2 mt-1 ${darkMode && ` bg-dark-surface border-main text-white`}`}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Phone Number</label>
                                <input
                                    type="tel"
                                    name="number"
                                    defaultValue={currentUser?.phone}
                                    className={`w-full border input border-gray-300 rounded-lg px-4 py-2 mt-1 ${darkMode && ` bg-dark-surface border-main text-white`}`}
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium underline decoration-main">Registered Email (Read Only)</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className={`w-full border input border-gray-300 rounded-lg px-4 py-2 mt-1 bg-gray-100 cursor-not-allowed ${darkMode && ` bg-dark-surface border-main text-white`}`}
                                    placeholder="Enter your email"
                                    required
                                />
                                <p className="text-xs text-supporting mt-1">Orders must be placed using your registered account email.</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    defaultValue={currentUser?.address}
                                    className={`w-full border input border-gray-300 rounded-lg px-4 py-2 mt-1 ${darkMode && ` bg-dark-surface border-main text-white`}`}
                                    placeholder="Enter your address"
                                    required
                                />
                            </div>
                            {/* Booking Button */}
                            <input type="submit" value={"Checkout"} disabled={selectedSeats.length < 1} className={`w-full bg-main btn text-white shadow-none  py-2 rounded-lg font-semibold ${darkMode && ` text-white border-main `}`} />
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TravelSelectSet
