import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const jwtToken = Cookies.get("jwtToken");
  return jwtToken === undefined ? <Navigate to="/login" /> : children;
};

export default ProtectedRoute;
