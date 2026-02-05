import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useCurrentUser = () => {
    const { user } = useAuth() as any;
    const axiosPublic = useAxiosPublic();
    
    const { data: currentUser, isPending: currentUserLoading } = useQuery({
        queryKey: [user?.email, 'user'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data[0];
        }
    });
    
    return [currentUser, currentUserLoading];
};

export default useCurrentUser;
