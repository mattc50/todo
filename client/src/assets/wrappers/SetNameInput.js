import { styled } from "styled-components"

const Wrapper = styled.div`

input {
  color: var(--grey-900);
  font-size: 3.052rem;
  line-height: 1.3;
  padding: 0.5rem;
  margin: calc(-0.5rem) 0 calc(1.38rem - 0.5rem) -0.5rem;
  outline: none;
  background-color: transparent;
  width: calc(100% + 1rem);
}

input:hover {
  background-color: var(--grey-200)
}

h1 {
  width: auto;
  text-transform: none;
  overflow: hidden;
  white-space: nowrap;
}

@media (max-width: 767px) {
  input {
    font-size: 2.441rem;
  }
}

@media (max-width: 478px) {
  input, h1 {
    font-size: 1.953rem;
  }
}

`

export default Wrapper;