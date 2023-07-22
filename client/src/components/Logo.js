import logo from '../assets/images/logo.svg'
import Wrapper from '../assets/wrappers/Logo';

const Logo = () => {
  return (
    <Wrapper>
      <img src={logo} alt="Jobify" className="logo" />
      <h4 className="logo">Toto</h4>
    </Wrapper>
  )
};

export default Logo;