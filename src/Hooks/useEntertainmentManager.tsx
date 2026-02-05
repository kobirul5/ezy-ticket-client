import { useCheckEntertainmentManagerQuery } from "../app/features/auth/authApi";
import useAuth from "./useAuth";

const useEntertainmentManager = () => {
    const { user, loading } = useAuth() as any;
    const { data: entertainmentManagerData, isLoading: isEntertainmentManagerLoading } = useCheckEntertainmentManagerQuery(user?.email, {
        skip: loading || !user?.email,
    });

    return [entertainmentManagerData?.entertainmentManager, isEntertainmentManagerLoading];
};

export default useEntertainmentManager;
