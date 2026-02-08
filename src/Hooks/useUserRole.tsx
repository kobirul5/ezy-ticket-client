import { useGetMyProfileQuery } from "../app/features/user/userApi";
import useAuth from "./useAuth";

export type UserRole = "ADMIN" | "EVENT_MANAGER" | "TRAVEL_MANAGER" | "USER" | undefined;

const useUserRole = () => {
    const { user, loading } = useAuth() as any;
    
    // Skip query if no user is logged in
    const { data: profileData, isLoading: isProfileLoading } = useGetMyProfileQuery(undefined, {
        skip: loading || !user?.email,
    });

    const role: UserRole = profileData?.data?.role;
    
    // Return role and combined loading state
    return { 
        role, 
        isLoading: loading || isProfileLoading 
    };
};

export default useUserRole;
