import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
// import Loading from "./Loading"
// import Alert from "./Alert"
import Todo from "./Todo";
import Wrapper from '../assets/wrappers/TodosContainer'
import React from "react";
import { SkeletonLoad, SkeletonTodo } from "../components";

const AllTodosContainer = ({ todos }) => {
  const {
    totalTodos,
    getAllTodos,
    doneTodos
  } = useAppContext()

  const [initialLoad, setInitialLoad] = useState(true)

  const asyncFetch = async () => {
    await getAllTodos();
    setInitialLoad(false);
  }

  useEffect(() => {
    asyncFetch();
  }, [])

  return (
    <Wrapper>
      {initialLoad &&
        <SkeletonLoad context="todoProgress" />
      }
      {!initialLoad &&
        <div className="progress-container">
          <h5>{totalTodos ? `${totalTodos} Todo${todos.length !== 1 && 's'}` : 'There are no Todos to show.'}</h5>
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
        </div>}
      {initialLoad &&
        <div className="skeletons" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1rem" }}>
          <SkeletonTodo />
          <SkeletonTodo />
          <SkeletonTodo />
        </div>
      }
      {!initialLoad && todos.map((todo, index) => {
        return <Todo key={todo._id} item={index} {...todo} />
      })}
    </Wrapper>
  )
}

export default AllTodosContainer;