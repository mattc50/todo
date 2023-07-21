import styled from 'styled-components';

const Wrapper = styled.div`

@keyframes skeletonLoad {
  0% {
    background-position: right;
  }
  100% {
    background-position: left;
  }
}

outline: 1px solid var(--grey-300);
border-radius: var(--borderRadius);
background-size: 800% 800%;
/* background-image: linear-gradient(
  90deg,
  var(--grey-200) 33%, 
  var(--grey-300) 40%, 
  var(--grey-200) 47%,
  var(--grey-200)
); */

//  height:   margin-top
//          + margin-bottom
//          + h3 (font-size * line-height)
//          + p (margin-top + (font-size * line-height))
//          + border-top
//          + border-bottom
    height: calc((2*0.5rem) + (1.953rem*1.3) + (1rem*1.15) + 1rem + 2px);

animation: skeletonLoad 1s linear infinite;
margin-bottom: 1rem;

.skeleton-elements {
  padding: 0.5rem;
}

.skeleton-h3, .skeleton-p {
  background-image: linear-gradient(
    90deg,
    var(--grey-200) 33%, 
    var(--grey-300) 40%, 
    var(--grey-200) 47%,
    var(--grey-200)
  );
  background-size: 400% 400%;
  animation: skeletonLoad 1s linear infinite;
  border-radius: var(--borderRadius);
}
.skeleton-h3 {
  width: 50%;
  height: calc(1.953rem * 1.3);
}

.skeleton-p {
  height: calc(1rem * 1.15);
  width: 25%;
  margin-top: 1rem;
}

`

export default Wrapper;