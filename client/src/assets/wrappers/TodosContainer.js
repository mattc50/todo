import styled from 'styled-components';

const Wrapper = styled.div`
article {
  border-radius: var(--borderRadius);
  margin-bottom: 1rem;
}

.todo-new {
  transition: 0.2s;
  border: 1px solid var(--grey-300);
}

.todo-new:focus-within {
  transition: 0.2s;
  border: 1px solid transparent;
  background: linear-gradient(var(--grey-50), var(--grey-50)), 
              linear-gradient(2deg, var(--grey-500) 60%, var(--grey-400) 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

article {
  border: 1px solid transparent;
  background: linear-gradient(var(--grey-50), var(--grey-50)), 
              linear-gradient(2deg, var(--grey-500) 60%, var(--grey-400) 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

article:is(:hover, :focus, :active, :focus-within, :focus-visible) {
  transition: 0.2s;
  background: linear-gradient(var(--grey-50), var(--grey-50)), 
              linear-gradient(-10deg, var(--grey-500) 80%, var(--primary-400) 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.progress-container {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 1.38rem;
}

h5 {
  margin: 0;
}

small {
  color: var(--grey-700)
}

.progress {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.bar {
  height: 1rem;
  width: 200px;
  border-radius: var(--borderRadius);
  background-color: var(--grey-300);
  /* position: relative; */
}

.bar-width {
  height: 100%;
  /* position: absolute; */
  border-radius: var(--borderRadius);
  background: linear-gradient(60deg, var(--primary-400), var(--primary-500));
}
`

export default Wrapper