import { FaUsers, FaBus, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { useGetAllUsersQuery } from "@/app/features/user/userApi";
import { useGetBusServicesQuery } from "@/app/features/travel/travelApi";
import { Link } from "react-router-dom";

const AdminHome = () => {
    // Note: We might need a separate query for all events if eventApi exists
    const { data: usersRes } = useGetAllUsersQuery({ limit: 1 });
    const { data: busRes } = useGetBusServicesQuery(undefined);
    
    const stats = [
        { label: "Total Users", value: usersRes?.data?.total || 0, icon: <FaUsers />, color: "bg-blue-500", link: "/dashboard/manageUsers" },
        { label: "Bus Services", value: busRes?.data?.length || 0, icon: <FaBus />, color: "bg-emerald-500", link: "/dashboard/MyBusServices" },
        { label: "Active Events", value: "12", icon: <FaCalendarAlt />, color: "bg-purple-500", link: "/dashboard/manageEvents" },
        { label: "Verified Partners", value: "8", icon: <FaCheckCircle />, color: "bg-orange-500", link: "/dashboard/manageUsers" },
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 font-outfit">Admin Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center text-xl mb-4`}>
                            {stat.icon}
                        </div>
                        <p className="text-gray-500 font-medium">{stat.label}</p>
                        <h2 className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</h2>
                        <Link to={stat.link} className="text-sm text-main font-semibold mt-4 inline-block hover:underline">View Details →</Link>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link to="/dashboard/manageUsers" className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors border border-gray-200">
                            <h3 className="font-bold text-gray-800">Verify Partners</h3>
                            <p className="text-sm text-gray-500">Review and approve travel/event managers</p>
                        </Link>
                        <Link to="/dashboard/add-bus-service" className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors border border-gray-200">
                            <h3 className="font-bold text-gray-800">System Logs</h3>
                            <p className="text-sm text-gray-500">View recent activity across the platform</p>
                        </Link>
                    </div>
                </div>
                
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center text-center">
                    <div>
                        <div className="w-16 h-16 bg-main/10 text-main rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                            📈
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Platform Growth</h2>
                        <p className="text-gray-500">Detailed analytics and reports are coming soon in the next update.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
