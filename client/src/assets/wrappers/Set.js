import styled from 'styled-components';

const Wrapper = styled.article`
.set-info {
  padding: 0.5rem;
}

h3 {
  margin: 0;
  color: var(--grey-700);
  display: inline;
}

p {
  color: var(--grey-700);
  margin-bottom: 0;
}

/* &:hover h3 {
  color: transparent;
  background: linear-gradient(5deg, var(--grey-700)  25%, var(--primary-400));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
} */
`
export default Wrapper;