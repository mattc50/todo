import { Outlet, Link, useLocation } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { Navbar, SmallSidebar, BigSidebar } from '../../components'
import { useAppContext } from '../../context/appContext'

const SharedLayout = () => {
  const { setLoading } = useAppContext();

  // const location = useLocation().pathname;
  // const locSplit = location.split('/');
  // console.log(locSplit[1])

  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default SharedLayout