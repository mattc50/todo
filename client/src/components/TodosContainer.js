import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading"
import Alert from "./Alert"
import Todo from "./Todo";
import Wrapper from '../assets/wrappers/TodosContainer'
import TodoNew from "./TodoNew";


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
      {/* {showAlert && <Alert />} */}
      <h5>{totalTodos ? totalTodos : 'No'} todo{todos.length !== 1 && 's'}</h5>
      {todos.map((todo, index) => {
        return <Todo key={todo._id} item={index} {...todo} />
      })}
      <TodoNew />
    </Wrapper>
  )
}

export default TodosContainer;