import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { Loading } from '../components'

const ProtectedRoute = ({ children }) => {
  const { user, userLoading, isLoading, setLoading, setFound } = useAppContext();
  if (userLoading) {
    return // <Loading />;
  }
  if (!user) {
    return <Navigate to='/landing' />;
  }
  if (!setFound) {
    return <Navigate to='/404' />
  }
  return children;
};

export default ProtectedRoute