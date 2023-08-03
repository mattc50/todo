import styled from 'styled-components';

const Wrapper = styled.div`
padding-top: 1rem;
width: 100%;

label {
  text-transform: none;
}

textarea {
  /* content: attr(data-value) ''; */
  padding: 1rem !important;
  display: block;
  overflow: hidden;
  resize: none;
  line-height: inherit;
}


`
export default Wrapper