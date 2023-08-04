import { Outlet, useLocation } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { Navbar, SmallSidebar, BigSidebar } from '../../components'
import { useAppContext } from '../../context/appContext'

const SharedLayout = () => {
  const { setLoading, sets } = useAppContext();

  const location = useLocation().pathname;
  const locSplit = location.split('/');
  const page = locSplit[1]

  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        {/* <BigSidebar /> */}
        <div>
          {/* could change the initial value of sets to null rather than [] */}
          {page === 'set' ? (!setLoading || sets.length !== 0) && <Navbar /> : <Navbar />}
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default SharedLayout