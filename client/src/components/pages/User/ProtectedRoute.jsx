import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsAuthenticated(false);
      setIsChecking(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);

      if (!decodedToken?.exp) {
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
        setIsChecking(false);
        return;
      }

      const expiryTime = decodedToken.exp * 1000;
      console.log("it cheak what exactly time is reaming ",expiryTime)
      const remainingTime = expiryTime - Date.now();

      if (remainingTime <= 0) {
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
        setIsChecking(false);
        return;
      }

      setIsAuthenticated(true);
      setIsChecking(false);

      const timer = setTimeout(() => {
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
      }, remainingTime);

      return () => clearTimeout(timer);
    } catch (error) {
      console.log("Invalid JWT token:", error);

      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      setIsChecking(false);
    }
  }, []);

  if (isChecking) {
    return <div>Loading....</div>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;