import { useState } from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import { MdMenu } from 'react-icons/md'
import { FaUserCircle, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, logoutUser, user, setLoading } = useAppContext();

  return (
    !setLoading && <Wrapper>
      <div className="nav-center">
        {/* first column */}
        <button
          type="button"
          className="toggle-btn"
          onClick={toggleSidebar}
        >
          <MdMenu />
        </button>

        {/* second column */}
        {/* <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div> */}

        {/* third column */}
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            {!showLogout ? <FaCaretDown /> : <FaCaretUp />}
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={logoutUser}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar