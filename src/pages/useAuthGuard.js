import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useAuthGuard = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to PageNotFound page if not authenticated.
      navigate('*'); 
    }
  }, [isAuthenticated, navigate]);
};

export default useAuthGuard;
