import { useEffect } from "react"
import { useAppContext } from "../../context/appContext"

const Todo = () => {
  const { testGet } = useAppContext()

  useEffect(() => {
    testGet()
  }, [])

  return (
    <h1>Todo Page</h1>
  )
}

export default Todo