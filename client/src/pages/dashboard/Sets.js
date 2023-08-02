import React from "react"
import { useAppContext } from "../../context/appContext"
import { SetsContainer } from "../../components"

const Sets = () => {
  const { createSet, sets, isLoading } = useAppContext()

  return (
    <React.Fragment>
      <h1>Sets</h1>
      <SetsContainer sets={sets} />

      {/* placeholder for testing the creation of sets */}
      <button
        className="btn btn-block"
        disabled={isLoading}
        onClick={() => {
          createSet()
        }}>
        Create New Set
      </button>
    </React.Fragment>
  )
}

export default Sets