import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import Todo from "./Todo";
import Wrapper from '../assets/wrappers/TodosContainer'
import TodoNew from "./TodoNew";
import { useLocation } from "react-router-dom";
import SkeletonTodo from "./SkeletonTodo";
import SkeletonLoad from "./SkeletonLoad";

import React from "react";

const TodosContainer = ({
}) => {
  const {
    todos,
    totalTodos,
    getTodos,
    doneTodos,
    setLoading
  } = useAppContext()

  const [initialLoad, setInitialLoad] = useState(true)

  const location = useLocation().pathname;
  const splitLoc = location.split('/');
  const setId = splitLoc[splitLoc.length - 1]

  const asyncFetch = async () => {
    await getTodos(setId)
    setInitialLoad(false)
  }


  useEffect(() => {
    if (!setLoading) asyncFetch();
  }, [setLoading])

  return (
    <React.Fragment>
      <Wrapper>
        {/* {showAlert && <Alert />} */}
        {initialLoad &&
          <SkeletonLoad context="todoProgress" />
        }
        {!initialLoad &&
          <div className="progress-container">
            <h5>{totalTodos ? totalTodos : 'There are no'} Todo{todos.length !== 1 && 's'}{totalTodos ? '' : '. Add a Todo below!'}</h5>
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
          <div
            className="skeletons"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginBottom: "1rem"
            }}
          >
            <SkeletonTodo />
            <SkeletonTodo />
            <SkeletonTodo />
          </div>
        }
        {!initialLoad && todos.map((todo, index) => {
          return <Todo key={todo._id} item={index} {...todo} />
        })}
        {!initialLoad && <TodoNew set={setId} />}
      </Wrapper>
    </React.Fragment>
  )
}

export default TodosContainer;