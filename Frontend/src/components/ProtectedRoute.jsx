import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  //const token = localStorage.getItem('token');
  const [isAuth, setIsAuth] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try{
        const res = await fetch(`${API_URL}auth/protected`, {
          credentials: 'include'
        });
        setIsAuth(res.ok); //true if success
      }
      catch (err) {
        console.error("Auth check failed.");
        setIsAuth(false); //false on fail
      }
    };
    checkAuth();
  }, []);

  if (isAuth === null) return <div>Loading...</div>;
  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;