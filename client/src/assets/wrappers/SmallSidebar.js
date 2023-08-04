import styled from 'styled-components'

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }
  .content {
    background: var(--white);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--borderRadius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    display: flex;
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0;
    background: transparent;
    border-radius: 50%;
    border-color: transparent;
    font-size: 2rem;
    color: var(--grey-700);
    cursor: pointer;
  }
  .close-btn:is(:hover, :active, :focus) {
    transition: 0.2s;
    color: var(--grey-800);
    background: var(--grey-200)
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    color: var(--grey-500);
    padding: 1rem;
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
`
export default Wrapper
