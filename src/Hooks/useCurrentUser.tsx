import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useCurrentUser = () => {
    const { user } = useAuth() as any;
    const axiosPublic = useAxiosPublic();
    
    const { data: currentUser, isPending: currentUserLoading } = useQuery({
        queryKey: [user?.email, "user"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user?.email}`);
            // res.data is the body { success, data: userObj }
            return res.data?.data || null;
        }
    });
    
    return [currentUser, currentUserLoading];
};

export default useCurrentUser;
