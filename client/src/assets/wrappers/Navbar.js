import styled from 'styled-components'

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  z-index: 10;
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .nav-center {
    display: flex;
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
    /* box-shadow: var(--shadow-2); */
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

  /* .btn svg:first-of-type {
    height: 1.5rem;
    width: 1.5rem;
  } */

  /* .btn svg:last-of-type {
    transition: 0.2s;
  } */

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

  /* .dropdown-btn:hover {
    background-color: var(--white)
  } */

  .logo-text {
    display: none;
    margin: 0;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`
export default Wrapper
