import { useState } from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import { MdMenu } from 'react-icons/md'
import { FaUserCircle, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import convertToBase64 from '../utils/convertToBase64';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, logoutUser, user, setLoading } = useAppContext();

  const [postImage, setPostImage] = useState({ myFile: "" })

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  // const handleFileUpload = async (e) => {
  //   const file = e.target.files[0];
  //   const base64 = await convertToBase64(file)
  //   console.log(base64)
  // }

  return (
    <Wrapper>
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
            style={showLogout ? { backgroundColor: "var(--primary-50)" } : { backgroundColor: "var(--white)" }}
          >
            {user.profPic ? <img className="user-pic" src={user.profPic} /> : <FaUserCircle className="user-pic" />}
            {user?.name}
            <FaCaretDown style={!showLogout ? {} : { rotate: '180deg' }} />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            {/* <h5>{user?.name}</h5>
            <form onSubmit={handleSubmit}>
              <label htmlFor="image" className="btn">Choose Profile Picture</label>
              <input
                type="file"
                id="image"
                name="image"
                hidden
                // accept="image/*"
                accept=".jpg, .png, .jpeg, .gif"
                onChange={(e) => handleFileUpload(e)}
              />
              <button type="submit">Submit</button>
            </form> */}
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