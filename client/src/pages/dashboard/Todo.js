import React from "react"
import { useAppContext } from "../../context/appContext"
import { TextArea, TodosContainer } from "../../components"

const Todo = () => {
  const { todos } = useAppContext()

  return (
    <React.Fragment>
      <>
        <h1>Todo Page</h1>
        <TodosContainer todos={todos} />
        <TextArea
          type='text'
          name="Freeform"
        >
        </TextArea>
      </>
    </React.Fragment>
  )
}

export default Todo