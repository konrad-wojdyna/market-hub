import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Loading } from "../components";

const ProtectedRoute = () => {
  const { isInitialized, user } = useAuthContext();

  if (!isInitialized) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Outlet />;
    </div>
  );
};
export default ProtectedRoute;
