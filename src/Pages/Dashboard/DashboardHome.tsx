import useUserRole from "@/Hooks/useUserRole";
import AdminHome from "@/components/Dashboard/Home/AdminHome";
import EventManagerHome from "@/components/Dashboard/Home/EventManagerHome";
import TravelManagerHome from "@/components/Dashboard/Home/TravelManagerHome";

const DashboardHome = () => {
    const { role } = useUserRole();

    if (role === "ADMIN") {
        return <AdminHome />;
    }

    if (role === "TRAVEL_MANAGER") {
        return <TravelManagerHome />;
    }

    if (role === "EVENT_MANAGER") {
        return <EventManagerHome />;
    }

    return (
        <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">Welcome to Ezy Tickets Dashboard</h2>
                <p className="text-gray-500 mt-2">Loading your personalized experience...</p>
            </div>
        </div>
    );
};

export default DashboardHome;
