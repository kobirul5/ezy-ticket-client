import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUserRole from "../Hooks/useUserRole";

interface DashboardRouteProps {
    children: ReactNode;
}

const DashboardRoute = ({ children }: DashboardRouteProps) => {
    const { role, isLoading } = useUserRole();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-main"></span>
            </div>
        );
    }

    const authorizedRoles = ["ADMIN", "TRAVEL_MANAGER", "EVENT_MANAGER"];

    if (role && authorizedRoles.includes(role)) {
        return <>{children}</>;
    }

    // Redirect to home if not authorized
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default DashboardRoute;
