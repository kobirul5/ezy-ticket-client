import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetMyProfileQuery } from "../app/features/user/userApi";

interface DashboardRouteProps {
    children: ReactNode;
}

const DashboardRoute = ({ children }: DashboardRouteProps) => {
    const { data: profileData, isLoading } = useGetMyProfileQuery(undefined);
    const role = profileData?.data?.role;
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-main"></span>
            </div>
        );
    }

    const authorizedRoles = ["SUPER_ADMIN", "ADMIN", "TRAVEL_MANAGER", "EVENT_MANAGER", "USER"];

    if (role && authorizedRoles.includes(role)) {
        return <>{children}</>;
    }

    // Redirect to home if not authorized
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default DashboardRoute;
