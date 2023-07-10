import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { Loading } from '../components'

const ProtectedLogReg = ({ children }) => {
  const { user, userLoading } = useAppContext();
  if (userLoading) {
    console.log(userLoading)
    return
  }
  if (!userLoading && !user) {
    return children;
  }
  return <Navigate to='/' />
};

export default ProtectedLogReg