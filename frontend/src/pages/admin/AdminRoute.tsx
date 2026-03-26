import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "../../components";
import { useAuthContext } from "../../hooks/useAuthContext";

const AdminRoute = () => {
  const { isInitialized, user } = useAuthContext();

  if (!isInitialized) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "ADMIN") return <Navigate to="/listings" replace />;

  return <Outlet />;
};
export default AdminRoute;
