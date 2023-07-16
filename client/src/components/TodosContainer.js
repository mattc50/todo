import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading"
import Alert from "./Alert"
import Todo from "./Todo";
import Wrapper from '../assets/wrappers/TodosContainer'


const TodosContainer = ({ todos }) => {
  const {
    totalTodos,
    showAlert,
  } = useAppContext()

  // if (isLoading) {
  //   return <Loading center />
  // }

  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>{totalTodos} todo{todos.length > 1 && 's'} found</h5>
      <div className="todos">
        {todos.map((todo, index) => {
          return <Todo key={todo._id} item={index} {...todo} />
        })}
      </div>
    </Wrapper>
  )
}

export default TodosContainer;