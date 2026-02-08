import { useGetMyProfileQuery } from "../app/features/user/userApi";
import useAuth from "./useAuth";

const useTravelManager = () => {
    const { user, loading } = useAuth() as any;
    const { data: profileData, isLoading: isProfileLoading } = useGetMyProfileQuery(undefined, {
        skip: loading || !user?.email,
    });

    // Check if user role is travel manager
    const isTravelManager = profileData?.data?.role === "TRAVEL_MANAGER";
    
    return [isTravelManager, isProfileLoading];
};

export default useTravelManager;
