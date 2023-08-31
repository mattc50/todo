import { useState } from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import { MdMenu } from 'react-icons/md'
import { FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import defaultUser from '../assets/images/defaultUser.svg';
import { NavLinks, Logo } from '../components';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, logoutUser, user } = useAppContext();

  return (
    <Wrapper>
      <div className="nav-center">
        {/* first column */}
        <div className="logo-container">
          <button
            aria-label="toggle navbar"
            type="button"
            className="toggle-btn"
            onClick={toggleSidebar}
          >
            <MdMenu />
          </button>
          <header>
            <Logo />
          </header>
        </div>

        {/* second column */}
        <div className="nav-container">
          <NavLinks />
          <Logo />
        </div>

        {/* third column */}
        <div className="btn-container">
          <button
            aria-label="open logout"
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
            style={showLogout ? { backgroundColor: "var(--grey-200)" } : { backgroundColor: "var(--white)" }}
          >
            <img
              className="user-pic"
              src={user.profPic?.compSmall || defaultUser}
              alt="profile"
            />
            {user?.name}
            <FaCaretDown style={!showLogout ? {} : { rotate: '180deg' }} />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              aria-label="logout user"
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