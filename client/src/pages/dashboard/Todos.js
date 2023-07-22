import React, { useEffect } from "react";
import Todo from "../../components/Todo";
import { useAppContext } from "../../context/appContext";
import AllTodosContainer from "../../components/AllTodosContainer";

const Todos = () => {
  const { todos, getAllTodos, set } = useAppContext()

  return (
    <React.Fragment>
      <h1>All Todos</h1>
      <AllTodosContainer todos={todos} />
    </React.Fragment>
  )
}

export default Todos;