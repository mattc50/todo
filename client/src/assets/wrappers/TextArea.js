import styled from 'styled-components';

const Wrapper = styled.div`
padding-top: 1rem;
width: 100%;

label {
  text-transform: none;
}

textarea {
  padding: 0 1rem 0 0;
  border-radius: 0;
  outline: none;
  display: block;
  overflow: hidden;
  resize: none;
  line-height: inherit;
  background-color: transparent;
  margin-bottom: 0;
  scroll-padding-right: 1rem;
}

.textarea-container {
  border-radius: var(--borderRadius);
  padding: 1rem 0 1rem 1rem;
  background: var(--white);
  color: var(--grey-700);
  width: 100%;
  border: none;
  outline: 1px solid var(--grey-500);

  &:hover {
    transition: 0.1s;
    background-color: var(--grey-100)
  }
}

textarea:is(:hover, :active, :focus, :focus-visible) {
  background-color: transparent;
  outline: none;
  box-shadow: none;
}

.textarea-container:focus-within {
  outline: 2px solid var(--primary-400);
  background-color: white !important;
  transition: box-shadow 0.1s linear;
  box-shadow: var(--input-shadow)
}

::-webkit-scrollbar {
  width: 0.625rem;
}

/* ::-webkit-scrollbar-track {
  width: 1rem;
} */

::-webkit-scrollbar-thumb {
  width: 0.625rem;
  border-radius: calc(0.625rem / 2);
  background: rgba(31, 31, 31, 0.1)
}

::-webkit-scrollbar-thumb:hover {
  transition: 0.2s;
  background: rgba(31, 31, 31, 0.14)
}
`
export default Wrapper