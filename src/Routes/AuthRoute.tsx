import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

interface AuthRouteProps {
    children: ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
    const { user, loading } = useAuth() as any;

    if (loading) {
        return <div className="my-36 w-full flex-col justify-center text-center items-center">
            <progress className="progress w-56"></progress>
            <p className="mt-4 text-gray-600">Loading, please wait...</p>
        </div>
    }
    if (user) {
        return <Navigate to={"/"} replace></Navigate>
    }
    return <>{children}</>
};

export default AuthRoute;
