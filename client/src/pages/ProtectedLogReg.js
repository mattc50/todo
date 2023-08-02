import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const ProtectedLogReg = ({ children }) => {
  const { user, userLoading } = useAppContext();
  if (userLoading) {
    return
  }
  if (!userLoading && !user) {
    return children;
  }
  return <Navigate to='/' />
};

export default ProtectedLogReg