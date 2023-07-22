import React from 'react'
import Wrapper from '../assets/wrappers/SkeletonLoad'

const SkeletonLoad = ({ context }) => {
  let wrapperClass = '';
  if (context === "setName") wrapperClass = "set-name";
  if (context === "todoProgress") wrapperClass = "todo-progress";

  return (
    <Wrapper>
      <div className={`skeleton ${wrapperClass}`} />
    </Wrapper>
  )
}

export default SkeletonLoad