import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedAdminRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('adminToken');
    if (!token ||  token === undefined) {
      toast.error("You need to login first before you access this area");
      navigate('/');
    }
  }, [navigate]);

  return (
    <>{children}</>
  );
};

export default ProtectedAdminRoutes;