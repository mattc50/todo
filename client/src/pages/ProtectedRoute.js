import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { Loading } from '../components'

const ProtectedRoute = ({ children }) => {
  const { user, userLoading, isLoading, setLoading, setFound, set } = useAppContext();
  // console.log(`${setFound} and ${setLoading}`)
  if (userLoading) {
    return // <Loading />;
  }
  if (!user) {
    return <Navigate to='/landing' />;
  }
  // if (!set) {
  //   return
  // }
  // if (!setFound || set && set.createdBy !== user._id) {
  //   return <Navigate to='/404' />
  // }
  return children;
};

export default ProtectedRoute