import { useCheckTravelManagerQuery } from "../app/features/auth/authApi";
import useAuth from "./useAuth";

const useTravelManager = () => {
    const { user, loading } = useAuth() as any;
    const { data: travelManagerData, isLoading: isTravelManagerLoading } = useCheckTravelManagerQuery(user?.email, {
        skip: loading || !user?.email,
    });

    return [travelManagerData?.travelManager, isTravelManagerLoading];
};

export default useTravelManager;
