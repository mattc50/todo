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
  width: 100%;
}

input:hover {
  background-color: var(--grey-200)
}

h1 {
  text-transform: none;
  width: 200px;
}
`

export default Wrapper;