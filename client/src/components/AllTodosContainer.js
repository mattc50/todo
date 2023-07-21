import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
// import Loading from "./Loading"
// import Alert from "./Alert"
import Todo from "./Todo";
import Wrapper from '../assets/wrappers/TodosContainer'
import TodoNew from "./TodoNew";
import { Navigate, useLocation, useParams } from "react-router-dom";

import React from "react";
import Loading from "./Loading";

const AllTodosContainer = ({ todos }) => {
  const {
    totalTodos,
    getTodos,
    getAllTodos,
    doneTodos,
    isLoading,
    setFound,
  } = useAppContext()

  // const location = useLocation().pathname;
  // const splitLoc = location.split('/');
  // const setId = splitLoc[splitLoc.length - 1]

  useEffect(() => {
    // getSet(setId)
    getAllTodos()
  }, [])
  // console.log(todos)

  // if (isLoading) {
  //   return <Loading />
  // }

  return (
    <Wrapper>
      <div className="progress-container">
        <h5>{totalTodos ? totalTodos : 'No'} todo{todos.length !== 1 && 's'}{totalTodos ? '' : '. Add a Todo below!'}</h5>
        {totalTodos > 0 && <div className="progress">
          <small>{doneTodos} completed</small>
          <div className="bar">
            <div
              className="bar-width"
              style={{
                width: ((200 / totalTodos) * doneTodos) || 0,
                transition: "0.4s ease-out"
              }}
            >
            </div>
          </div>
        </div>}
      </div>
      {todos.map((todo, index) => {
        return <Todo key={todo._id} item={index} {...todo} />
      })}
    </Wrapper>
  )
}

export default AllTodosContainer;