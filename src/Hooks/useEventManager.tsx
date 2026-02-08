import { useGetMyProfileQuery } from "../app/features/user/userApi";
import useAuth from "./useAuth";

const useEventManager = () => {
    const { user, loading } = useAuth() as any;
    const { data: profileData, isLoading: isProfileLoading } = useGetMyProfileQuery(undefined, {
        skip: loading || !user?.email,
    });

    // Check if user role contains "EVENT" or is specifically an event manager
    const isEventManager = profileData?.data?.role === "EVENT_MANAGER";
    
    return [isEventManager, isProfileLoading];
};

export default useEventManager;
