import React from "react"
import { useAppContext } from "../../context/appContext"
import { TextArea, TodosContainer, SetsContainer } from "../../components"

const Todo = () => {
  const {
    todos,
    // createSet,
    // sets
  } = useAppContext()

  // pleaceholder array for the todos value of the Set; contains a single Todo
  const set = [
    "64b6ee8c1008085a3bc81d26"
  ]

  return (
    <React.Fragment>
      <h1>Todo Page</h1>
      {/* <SetsContainer sets={sets} /> */}
      <TodosContainer todos={todos} />
      <TextArea
        type='text'
        name="Freeform"
      >
      </TextArea>

      {/* placeholder for testing the creation of sets */}
      {/* <button onClick={() => {
        // console.log('run')
        createSet(set)
      }}>
        Create Set
      </button> */}
    </React.Fragment>
  )
}

export default Todo