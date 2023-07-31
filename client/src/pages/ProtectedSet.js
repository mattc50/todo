import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const ProtectedSet = ({ children }) => {
  const {
    user,
    setFound,
    set
  } = useAppContext();

  if (!user) {
    return <Navigate to='/landing' />;
  }

  if (!setFound || (set && set.createdBy !== user._id)) {
    return <Navigate to='/404' />
  }
  return children;
};

export default ProtectedSet