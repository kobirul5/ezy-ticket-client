import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useEntertainmentManager = () => {
    const { user, loading } = useAuth() as any;
    const axiosSecure = useAxiosSecure();
    
    const { data: isEntertainmentManager, isPending: isEntertainmentManagerLoading } = useQuery({
        queryKey: [user?.email, 'isEntertainmentManager'],
        enabled: !loading && !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/entertainmentManager/${user?.email}`);
            return res.data?.entertainmentManager;
        }
    });

    return [isEntertainmentManager, isEntertainmentManagerLoading];
};

export default useEntertainmentManager;
