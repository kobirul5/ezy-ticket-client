import { FaBus, FaTicketAlt, FaMoneyBillWave, FaPlusCircle } from "react-icons/fa";
import { useGetBusServicesQuery } from "@/app/features/travel/travelApi";
import { useGetMyBusOrdersQuery } from "@/app/features/order/orderApi";
import { Link } from "react-router-dom";

const TravelManagerHome = () => {
    const { data: busRes } = useGetBusServicesQuery(undefined);
    const { data: ordersRes } = useGetMyBusOrdersQuery(undefined);

    const busCount = busRes?.data?.length || 0;
    const ticketCount = ordersRes?.data?.length || 0;
    const totalRevenue = ordersRes?.data?.reduce((acc: number, order: any) => acc + (order.totalAmount || 0), 0) || 0;

    const stats = [
        { label: "My Buses", value: busCount, icon: <FaBus />, color: "bg-emerald-500", link: "/dashboard/MyBusServices" },
        { label: "Tickets Sold", value: ticketCount, icon: <FaTicketAlt />, color: "bg-blue-500", link: "/dashboard/SoldTickets" },
        { label: "Total Revenue", value: `${totalRevenue}৳`, icon: <FaMoneyBillWave />, color: "bg-main", link: "/dashboard/SoldTickets" },
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 font-outfit">Travel Manager Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className={`w-14 h-14 ${stat.color} text-white rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-lg shadow-${stat.color.split('-')[1]}/20`}>
                            {stat.icon}
                        </div>
                        <p className="text-gray-500 font-medium text-lg">{stat.label}</p>
                        <h2 className="text-4xl font-black text-gray-800 mt-1">{stat.value}</h2>
                        <Link to={stat.link} className="text-sm text-main font-bold mt-4 inline-block hover:underline">Manage Service →</Link>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Grow Your Business</h2>
                    <p className="text-gray-500 mb-8 max-w-md">Reach more customers by adding new routes and offering competitive pricing for your bus services.</p>
                    <Link to="/dashboard/add-bus-service" className="flex items-center justify-center gap-2 bg-main hover:bg-green-600 text-white w-fit px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-green-100">
                        <FaPlusCircle /> Add New Bus Route
                    </Link>
                </div>

                <div className="bg-gradient-to-br from-main to-green-600 p-1 rounded-3xl shadow-xl">
                    <div className="bg-white h-full w-full rounded-[20px] p-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Tip</h3>
                        <div className="space-y-4 text-gray-600">
                            <p className="flex gap-3">
                                <span className="text-main font-bold">✓</span>
                                Keep your seat pricing updated to attract more passengers.
                            </p>
                            <p className="flex gap-3">
                                <span className="text-main font-bold">✓</span>
                                Ensure your contact information is accurate for support.
                            </p>
                            <p className="flex gap-3">
                                <span className="text-main font-bold">✓</span>
                                Regularly check Sold Tickets for trip preparation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelManagerHome;
