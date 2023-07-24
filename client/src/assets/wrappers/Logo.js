import styled from 'styled-components'

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 0.5rem;

.img {
  max-width: 75px;
}

h4 {
  color: var(--primary-400);
  margin: 0; 
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  padding-right: 0.5rem;
}

`
export default Wrapper;