import { useAuth } from "../../contexts/auth/useAuth"
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoadingPageAll } from "../Loadings/loadingPageAll";

export const PublicRoutes = () => {
    const auth = useAuth();
    const location = useLocation();
    
    if (auth.isLoading)
        return <LoadingPageAll />

    
    if(location.pathname.includes('login') && auth.user?.email)
        return <Navigate to={'/admin'} replace />;

    return <Outlet />;
};