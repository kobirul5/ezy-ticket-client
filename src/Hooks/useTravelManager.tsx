import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useTravelManager = () => {
    const { user, loading } = useAuth() as any;
    const axiosSecure = useAxiosSecure();
    
    const { data: isTravelManager, isPending: isTravelManagerLoading } = useQuery({
        queryKey: [user?.email, 'isTravelManager'],
        enabled: !loading && !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/travelManager/${user?.email}`);
            return res.data?.travelManager;
        }
    });
    
    return [isTravelManager, isTravelManagerLoading];
};

export default useTravelManager;
