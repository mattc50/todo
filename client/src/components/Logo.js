import logo from '../assets/images/logo.svg'
import Wrapper from '../assets/wrappers/Logo';

const Logo = () => {
  return (
    <Wrapper>
      <img src={logo} alt="Jobify" className="logo img" />
      <h5 className="logo name">Toto</h5>
    </Wrapper>
  )
};

export default Logo;