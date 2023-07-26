import Wrapper from '../assets/wrappers/SmallSidebar';
import { MdClose } from 'react-icons/md'
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import NavLinks from './NavLinks';


const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={toggleSidebar}
          >
            <MdClose />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar