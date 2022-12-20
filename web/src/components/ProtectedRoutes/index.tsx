import { useAuth } from "../../contexts/auth/useAuth"
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingPageAll } from "../Loadings/loadingPageAll";

export const ProtectedRoutes = () => {
    const auth = useAuth();
    
    if (auth.isLoading)
        return <LoadingPageAll />

    if (!auth.user?.email) {
        return <Navigate to={'/login'} replace />;
    }
    
//   const [{ route }] = matchRoutes(routes, location)

    return <Outlet />;
};