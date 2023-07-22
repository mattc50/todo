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
/* height: 2.5rem;
width: 100%;

border-radius: var(--borderRadius);
height: calc(3.052rem * 1.3);
width: 25%;
margin: calc(-0.5rem) 0 calc(1.38rem - 0.5rem) -0.5rem; */

.todo-progress {
  /* --smallText */
  height: calc((0.8rem * 1.15) * 1.15 + 0.25rem + 1rem);
  width: 20%;
  margin-bottom: 1rem;
}

.set-name {
  height: calc(3.052rem * 1.3 + 1rem);
  width: 25%;
  margin: calc(-0.5rem) 0 calc(1.38rem - 0.5rem) -0.5rem;
}


`

export default Wrapper;