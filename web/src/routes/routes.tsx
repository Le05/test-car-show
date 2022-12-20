import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "../components/ProtectedRoutes";
import { PublicRoutes } from "../components/PublicRoutes";
import { ListagemAdmin } from "../pages/ListagemAdmin";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicRoutes />}>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />}></Route>
                </Route>

                <Route element={<ProtectedRoutes />}>
                    <Route path="/admin" element={<ListagemAdmin />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}