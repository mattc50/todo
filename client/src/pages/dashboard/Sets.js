import React from "react"
import { useAppContext } from "../../context/appContext"
import { SetsContainer } from "../../components"
import SkeletonSet from "../../components/SkeletonSet"

const Sets = () => {
  const { createSet, sets, isLoading } = useAppContext()

  return (
    <React.Fragment>
      <h1>Sets</h1>
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
          createSet()
        }}>
        Create New Set
      </button>
    </React.Fragment>
  )
}

export default Sets