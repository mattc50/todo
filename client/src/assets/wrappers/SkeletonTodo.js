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


display: flex;
gap: 1rem;
outline: 1px solid var(--grey-300);
padding: 0.5rem;
height: calc(2.5rem + 1rem);
border-radius: var(--borderRadius);


.skeleton-status {
  width: 2.5rem;
  border-radius: 50%;
  background-size: 800% 800%;
  background-image: linear-gradient(
  90deg,
  var(--grey-100) 33%, 
  var(--grey-200) 40%, 
  var(--grey-100) 47%,
  var(--grey-100)
);
  animation: skeletonLoad 0.8s linear backwards infinite;}

.skeleton-input {
  background-size: 400% 400%;
  background-image: linear-gradient(
  90deg,
  var(--grey-100) 33%, 
  var(--grey-200) 40%, 
  var(--grey-100) 47%,
  var(--grey-100)
);
  animation: skeletonLoad 0.8s linear backwards infinite;
  border-radius: var(--borderRadius);
  width: 50%;
}


`
export default Wrapper;