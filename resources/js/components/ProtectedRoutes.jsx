// In ProtectedRoutes.js
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = ({ auth }) => {
    return auth === true ? <Outlet /> : <Navigate to="/login" replace />;
};
export default ProtectedRoutes;
