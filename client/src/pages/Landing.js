import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/toto-landing.svg'

// Curly braces are used only for import when export is named.
// If the export is default then curly braces are not used for import.
// For a default export we do not use { } when we import.
import { Logo } from '../components';
import { Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

import React from 'react';

const Landing = () => {
  const { user } = useAppContext()

  return (
    // React.Fragment is used to return 2 adjacent components.
    // This was the source of how to solve the redirect content rendering issue: https://stackoverflow.com/a/70723559
    <React.Fragment>
      {user && <Navigate to='/' />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          {/*info*/}
          <div className="info">
            <h1>
              Track your <span>Todos</span>
            </h1>
            <p>
              Stay on top of your tasks with an intuitive organization system and extensive flexibility.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </Wrapper>
    </React.Fragment>
  )
}

export default Landing