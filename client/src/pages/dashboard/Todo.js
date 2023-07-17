import { useEffect } from "react"
import { useAppContext } from "../../context/appContext"
import { TextArea, TodosContainer, TodoNew } from "../../components"

const Todo = () => {
  const { testGet, getTodos, todos, totalTodos, updateTodo } = useAppContext()

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <h1>Todo Page</h1>
      <TodosContainer todos={todos} />
      <TextArea
        type='text'
        name="Freeform"
      >
      </TextArea>
    </>

  )
}

export default Todo