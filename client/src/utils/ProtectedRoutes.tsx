import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const accessToken = localStorage.getItem("accessToken");

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
