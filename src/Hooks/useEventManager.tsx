import { useCheckEventManagerQuery } from "../app/features/auth/authApi";
import useAuth from "./useAuth";

const useEventManager = () => {
    const { user, loading } = useAuth() as any;
    const { data: eventManagerData, isLoading: isEventManagerLoading } = useCheckEventManagerQuery(user?.email, {
        skip: loading || !user?.email,
    });

    return [eventManagerData?.eventManager, isEventManagerLoading];
};

export default useEventManager;
