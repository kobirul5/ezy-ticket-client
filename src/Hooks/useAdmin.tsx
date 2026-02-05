import { useCheckAdminQuery } from "../app/features/auth/authApi";
import useAuth from "./useAuth";

const useAdmin = () => {
    const { user, loading } = useAuth() as any;
    const { data: adminData, isLoading: isAdminLoading } = useCheckAdminQuery(user?.email, {
        skip: loading || !user?.email,
    });

    return [adminData?.admin, isAdminLoading];
};

export default useAdmin;
