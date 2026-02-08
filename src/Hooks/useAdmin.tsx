import { useGetMyProfileQuery } from "../app/features/user/userApi";
import useAuth from "./useAuth";

const useAdmin = () => {
    const { user, loading } = useAuth() as any;
    const { data: profileData, isLoading: isProfileLoading } = useGetMyProfileQuery(undefined, {
        skip: loading || !user?.email,
    });

    const isAdmin = profileData?.data?.role === "ADMIN";
    
    return [isAdmin, isProfileLoading];
};

export default useAdmin;
