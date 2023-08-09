import { Link } from 'react-router-dom';
import img from '../assets/images/404.svg';
import Wrapper from '../assets/wrappers/ErrorPage';
import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';

const Error = () => {

  const { clearFound, setFound } = useAppContext()

  useEffect(() => {
    clearFound();
    // eslint-disable-next-line
  }, [setFound])

  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt='not found' />
        <h3>Ohh! page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">Back Home</Link>
      </div>
    </Wrapper>
  )
}

export default Error;