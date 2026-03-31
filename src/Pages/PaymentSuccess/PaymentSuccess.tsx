import { FaCircleCheck, FaReceipt } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { FiPackage, FiHash } from "react-icons/fi";
import { useGetOrderByTranIdQuery } from "@/app/features/order/orderApi";
import useAuth from "@/Hooks/useAuth";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PaymentSuccess = () => {
    const { tran_id } = useParams();
    const { darkMode } = useAuth() as any;
    const { data: orderRes, isLoading, isError } = useGetOrderByTranIdQuery(tran_id);
    const order = orderRes?.data;
    const orderDetails = order?.orderData as any;

    const contentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({ contentRef } as any);

    if (isLoading) return (
        <div className="min-h-screen pt-24 flex items-center justify-center">
            <div className="animate-pulse text-xl">Loading your receipt...</div>
        </div>
    );

    if (isError) return (
        <div className="min-h-screen pt-24 flex items-center justify-center">
            <div className="text-xl text-red-500">Failed to load order details</div>
        </div>
    );

    if (!order) return <div className="min-h-screen pt-24 text-center">No order data found</div>;

    return (
        <div className={`min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-dark-background" : "bg-gray-50"}`}>
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8 no-print">
                    <div className="flex items-center gap-3 mx-auto w-fit">
                        <div className="p-2 rounded-full bg-green-100">
                            <FaCircleCheck className="text-4xl text-green-600" />
                        </div>
                        <h1 className={`text-3xl font-bold tracking-tight sm:text-4xl ${darkMode ? "text-white" : "text-gray-900"}`}>
                            Payment Successful!
                        </h1>
                    </div>
                    <p className={`mt-2 text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        Thank you for your purchase, <span className="font-semibold text-main">{order.customerName}</span>!
                    </p>
                </div>

                <div ref={contentRef} className={`${darkMode ? "bg-dark-surface no-print-bg" : "bg-white"} shadow-lg rounded-lg overflow-hidden`}>
                    <div className="px-6 py-5 bg-main text-white flex items-center">
                        <FaReceipt className="h-6 w-6 mr-2" />
                        <h2 className="text-xl font-semibold">Order Receipt</h2>
                    </div>

                    <div className="border-t border-gray-200 px-6 py-5">
                        <div className="flex flex-col md:flex-row justify-between items-start">
                            <div className={darkMode ? "text-gray-300" : "text-gray-600"}>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium opacity-75">Order ID: </p>
                                    <p className="text-lg font-semibold">{order.id}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium opacity-75">Transaction ID: </p>
                                    <p className="text-lg font-semibold">{order.tranId}</p>
                                </div>
                            </div>
                            <div className={`md:text-right flex md:flex-col items-center md:items-end gap-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                <p className="text-sm font-medium">Date</p>
                                <p className="text-sm md:text-lg">
                                    {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className={`text-lg font-medium mb-4 flex items-center ${darkMode ? "text-white" : "text-gray-900"}`}>
                                <FiPackage className="mr-2" /> Order Summary
                            </h3>
                            <div className={`${darkMode ? "bg-[#2d2d2d]" : "bg-gray-50"} rounded-lg p-4`}>
                                <div className="flex justify-between py-2 border-b border-gray-200/10">
                                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Product</p>
                                    <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{orderDetails?.product || "EzyTicket Purchase"}</p>
                                </div>
                                {orderDetails?.quantity && (
                                    <div className="flex justify-between py-2 border-b border-gray-200/10">
                                        <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Quantity</p>
                                        <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{orderDetails.quantity}</p>
                                    </div>
                                )}
                                <div className="flex justify-between py-2 border-b border-gray-200/10">
                                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Category</p>
                                    <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{order.productType}</p>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200/10">
                                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Unit Price</p>
                                    <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Tk {orderDetails?.unitPrice || order.totalAmount}</p>
                                </div>
                                <div className="flex justify-between py-2 mt-4 pt-4 border-t border-gray-300">
                                    <p className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Total Paid</p>
                                    <p className="text-xl font-bold text-main">Tk {order.totalAmount}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 no-print">
                            <h3 className={`text-lg font-medium mb-4 flex items-center ${darkMode ? "text-white" : "text-gray-900"}`}>
                                <FiHash className="mr-2" /> Next Steps
                            </h3>
                            <div className={`${darkMode ? "bg-[#2d2d2d]" : "bg-gray-50"} rounded-lg p-4`}>
                                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                                    # Your order is Complete. Go to Dashboard and download your ticket.<br />
                                    # Print this Receipt for your records.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`mt-8 px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-center no-print`}>
                    <button
                        onClick={() => handlePrint()}
                        className="ezy-button-primary"
                    >
                        Print Receipt
                    </button>
                    <a href="/" className={`font-medium hover:underline ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;