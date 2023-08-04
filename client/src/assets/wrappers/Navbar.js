import styled from 'styled-components'

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  z-index: 10;

  .logo {
    align-items: center;
    width: 100px;
  }

  .logo:last-child {
    display: none;
  }

  header {
    display: none;
  }

  .nav-links {
    display: none;
  }

  header * {
    justify-content: left;
  }

  .nav-center {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr auto 1fr;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  background: var(--white);
  
  .btn-container {
    position: relative;
    justify-self: right;
  }
  
  .btn {
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    position: relative;
    background-color: var(--white);
    color: var(--grey-700);
    border: 1px solid var(--grey-300)
  }

  .btn:is(:hover, :active, :focus-visible) {
    background-color: var(--grey-200) !important
  }

  .btn svg {
    height: 1.25rem;
    width: 1.25rem;
    transition: 0.2s;
    color: var(--primary-400)
  }

  .user-pic {
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    height: 2rem;
    width: 2rem;
  }

  .dropdown {
    position: absolute;
    top: 3.25rem;
    left: 0;
    width: 100%;
    background-color: var(--white);
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }

  .show-dropdown {
    visibility: visible;
  }

  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--grey-700);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }

  .logo-text {
    display: none;
    margin: 0;
  }

  


  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .logo-text {
      display: block;
    }

    .nav-links {
      display: flex;
      gap: 1rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      color: var(--grey-500);
      padding: 0.75rem;
      border-radius: var(--borderRadius);
      outline-offset: 0;
      outline: 1px transparent;
      text-transform: capitalize;
      transition: var(--transition);
    }

    .nav-link:is(:hover, :active, :focus, :focus-visible) {
      background: var(--primary-50);
      color: var(--grey-900);
      outline: 1px solid var(--primary-100);
    }
  
    .nav-link:is(:hover, :focus, :focus-visible) .icon {
        color: var(--primary-500);
    }

    header {
      display: block;
    }

    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: var(--transition);
    }

    .active {
      color: var(--grey-900);
    }

    .active .icon {
      color: var(--primary-500);
    }

    .nav-center .toggle-btn {
      display: none;
    }

  .logo {
    display: flex;
    /* align-items: center; */
    width: 100px;
  }

  .logo:last-child {
    display: block;
  }

  .nav-container .logo {
    display: none;
  }
}

@media (min-width: 1120px) {
  .nav-center {
    max-width: 1120px;
  }
}
`
export default Wrapper
