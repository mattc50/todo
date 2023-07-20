import styled from 'styled-components';

const Wrapper = styled.div`
article {
  border: 1px solid transparent;
  margin-bottom: 1rem;
  border-radius: var(--borderRadius);
  background: linear-gradient(var(--grey-50), var(--grey-50)), 
              linear-gradient(2deg, var(--grey-500) 60%, var(--grey-400) 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

article:is(:hover, :active, :focus, :focus-visible, :focus-within) {
  transition: background-image 0.2s;
  background-image: //linear-gradient(var(--grey-200), var(--grey-200)), 
                    linear-gradient(var(--grey-50), var(--grey-50)), 
                    linear-gradient(-10deg, var(--grey-500) 80%, var(--primary-400) 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: var(--input-shadow)
}

.set-link {
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  outline: none;
}

.set-link:is(:hover) > article {
  transition: 0.2s;
  background-image: //linear-gradient(var(--grey-200), var(--grey-200)), 
                    linear-gradient(var(--grey-50), var(--grey-50)), 
                    linear-gradient(-10deg, var(--grey-500) 80%, var(--primary-400) 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: var(--input-shadow)
}

.set-link:is(:active, :focus, :focus-visible) > article {
  transition: background-image background-origin background-clip box-shadow 0.2s;
  background-image: //linear-gradient(var(--grey-200), var(--grey-200)), 
                    linear-gradient(var(--grey-50), var(--grey-50)), 
                    linear-gradient(-10deg, var(--grey-500) 80%, var(--primary-400) 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: var(--input-shadow);
  outline: 2px solid var(--primary-400);
}

/* .set-link:is(:focus-visible) > article {
  transition: background-image 0.2s;
  background-image: //linear-gradient(var(--grey-200), var(--grey-200)), 
                    linear-gradient(var(--grey-50), var(--grey-50)), 
                    linear-gradient(-10deg, var(--grey-500) 80%, var(--primary-400) 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
} */

/* article:is(:focus, :focus-visible, :focus-within) {
  outline-style: none;
  border: 1px solid transparent;
} */
  /* outline: 2px solid var(--primary-400); */
//}

/* article *:is(:focus, :focus-visible, :focus-within) {
  outline: none;
} */

.progress-container {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 1.38rem;
}

.set-link:is(:hover, :active, :focus, :focus-visible) h3 {
  color: transparent;
  background: linear-gradient(5deg, var(--grey-700)  25%, var(--primary-400));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
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

export default Wrapper;