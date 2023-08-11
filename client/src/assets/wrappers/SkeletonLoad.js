import styled from 'styled-components'

const Wrapper = styled.div`
@keyframes skeletonLoad {
  0% {
    background-position: right;
  }
  100% {
    background-position: left;
  }
}

/*
--h1-lg: 3.052rem;
--h1-md: 2.441rem;
--h1-sm: 1.953rem;

--line-height: 1.15;
--input-line-height: 1.3;

--prog-bar-height: 1rem;
--bar-num-gap: 0.25rem;
--small-text-proxy: var(--small-text);
*/

.skeleton {
  background-image: linear-gradient(
    90deg,
    var(--grey-100) 33%, 
    var(--grey-200) 40%, 
    var(--grey-100) 47%,
    var(--grey-100)
  );
  background-size: 400% 400%;
  animation: skeletonLoad 0.8s linear backwards infinite;
  border-radius: var(--borderRadius);
}

.todo-progress {
  height: calc((0.8rem * 1.15) + 0.25rem + 1rem);
  width: 20%;
  margin-bottom: 1rem;
}

.set-name {
  height: calc((3.052rem * 1.3) + 1rem);
  width: 25%;
  margin: calc(-0.5rem) 0 calc(1.38rem - 0.5rem) -0.5rem;
}

@media (max-width: 767px) {
  .set-name {
    height: calc((2.441rem * 1.3) + 1rem)
  }
}

@media (max-width: 478px) {
  .set-name {
    height: calc((1.953rem * 1.3) + 1rem)
  }
}
`

export default Wrapper;