import { FaCalendarPlus, FaTicketAlt, FaChartLine, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "@/Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const EventManagerHome = () => {
    const { user } = useAuth()! as any;
    const axiosSecure = useAxiosSecure();

    const { data: myEvents = [] } = useQuery({
        queryKey: ["myEvents", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/events/${user?.email}`);
            return res.data;
        }
    });

    const totalSold = myEvents.reduce((acc: number, event: any) => acc + (event.soldTickets || 0), 0);
    const pendingEvents = myEvents.filter((e: any) => e.status !== "verified").length;

    const stats = [
        { label: "My Events", value: myEvents.length, icon: <FaCalendarPlus />, color: "bg-purple-500", link: "/dashboard/myAddedEvents" },
        { label: "Tickets Sold", value: totalSold, icon: <FaTicketAlt />, color: "bg-orange-500", link: "/dashboard/myAddedEvents" },
        { label: "Pending Approval", value: pendingEvents, icon: <FaChartLine />, color: "bg-blue-500", link: "/dashboard/myAddedEvents" },
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 font-outfit">Event Manager Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                        <div className={`w-14 h-14 ${stat.color} text-white rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                            {stat.icon}
                        </div>
                        <p className="text-gray-500 font-medium">{stat.label}</p>
                        <h2 className="text-4xl font-black text-gray-800 mt-1">{stat.value}</h2>
                        <Link to={stat.link} className="text-sm text-main font-bold mt-4 inline-block hover:underline">Manage Events →</Link>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-white to-purple-50 p-10 rounded-3xl border border-purple-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Host a New Event?</h2>
                    <p className="text-gray-600 mb-8">Reach thousands of people by listing your concert, workshop, or festival on Ezy Tickets.</p>
                    <Link to="/dashboard/addEvent" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-purple-200">
                        <FaPlus /> Create New Event
                    </Link>
                </div>

                <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Performance</h2>
                    {myEvents.length > 0 ? (
                        <div className="space-y-4">
                            {myEvents.slice(0, 3).map((event: any) => (
                                <div key={event._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <img src={event.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                                        <div>
                                            <h4 className="font-bold text-gray-800 truncate max-w-[150px]">{event.title}</h4>
                                            <p className="text-xs text-gray-500">{event.eventDate}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-main">{event.soldTickets} Sold</p>
                                        <p className="text-xs text-gray-400">{event.totalTickets - event.soldTickets} Left</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-400 italic">No events found to display performance.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventManagerHome;
