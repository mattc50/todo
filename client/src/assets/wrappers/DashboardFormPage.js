import styled from 'styled-components'

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  /* padding: 3rem 2rem 4rem; */
  padding: 2rem;
  box-shadow: var(--shadow-2);

  h3 {
    margin-top: 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: grid;
    row-gap: 1rem;
  }

  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;

    button {
      height: 35px;
    }
  }

  .prof-pic-btns {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .prof-pic-btns * {
    width: 100%;
  }

  .user-pic {
    border-radius: 100px;
    overflow: hidden;
    object-fit: cover;
    width: 200px;
    min-width: 200px;
    height: 200px;
    color: var(--primary-400)
  }

  .img-container {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .clear-btn {
    background: var(--grey-500);
  }

  .clear-btn:hover {
    background: var(--black);
  }

  .form-action.img {
    height: 3rem;
    width: 3rem;

    & * {
      color: var(--grey-700)

    }
  }

  @media (max-width: 478px) {
    .img-container {
    }
    
    .user-pic {
      aspect-ratio: 1 / 1;
      min-width: 150px;
      height: 100%;
    }
  }

  @media (max-width: 767px) {
    .btn-secondary {
      display: none;
    }
  }

  @media (min-width: 767px) {
    .form-action.img {
      display: none;
    }
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr;
      column-gap: 1rem;
    }

    .btn-container {
      margin-top: 0;
    }
  }

  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .form-center button {
      margin-top: 0;
      grid-column: 1 / span 3;
    }
  }
`

export default Wrapper
