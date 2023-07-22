import React from 'react'
import Wrapper from '../assets/wrappers/SkeletonTodo'

const SkeletonTodo = () => {
  return (
    <Wrapper>
      <div className="skeleton-status" />
      <div className="skeleton-input" />
    </Wrapper>
  )
}

export default SkeletonTodo