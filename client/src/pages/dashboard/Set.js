import React from "react"
import { useAppContext } from "../../context/appContext"
import { SetsContainer } from "../../components"
import SkeletonSet from "../../components/SkeletonSet"

const Set = () => {
  const { createSet, sets, isLoading } = useAppContext()

  // pleaceholder array for the todos value of the Set; contains a single Todo
  const set = [
    "64b6ee8c1008085a3bc81d26"
  ]

  return (
    <React.Fragment>
      <h1>Todo Page</h1>
      {/* {isLoading &&
        <div style={{ display: "flex", gap: 16, flexDirection: "column" }}>
          <SkeletonSet />
          <SkeletonSet />
          <SkeletonSet />
        </div>
      } */}
      <SetsContainer sets={sets} />

      {/* placeholder for testing the creation of sets */}
      <button
        className="btn btn-block"
        disabled={isLoading}
        onClick={() => {
          // console.log('run')
          createSet(set)
        }}>
        Create New Set
      </button>
    </React.Fragment>
  )
}

export default Set