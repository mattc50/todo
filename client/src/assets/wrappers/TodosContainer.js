import styled from 'styled-components';

const Wrapper = styled.div`
article {
  border-radius: 0.5rem;
  margin-bottom: 1rem;

}

article:last-child {
  border: 1px solid var(--grey-300);
}

article:not(:last-child) {
border: 1px solid transparent;
background: linear-gradient(var(--grey-50), var(--grey-50)), 
            linear-gradient(-2deg, var(--grey-300) 75%, var(--grey-400) 100%);
background-origin: border-box;
background-clip: content-box, border-box;
}

article:not(:last-child):is(:hover, :focus-within) {
  transition: 0.2s;
  background: linear-gradient(var(--grey-50), var(--grey-50)), 
            linear-gradient(-10deg, var(--grey-300) 80%, var(--primary-400) 100%);
            background-origin: border-box;
    background-clip: content-box,border-box;
}
`

export default Wrapper