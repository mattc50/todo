import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
// import Loading from "./Loading"
// import Alert from "./Alert"
import Todo from "./Todo";
import Wrapper from '../assets/wrappers/TodosContainer'
import TodoNew from "./TodoNew";
import { Navigate, useLocation, useParams } from "react-router-dom";

import React from "react";
import Loading from "./Loading";
import SkeletonTodo from "./SkeletonTodo";
import SkeletonLoad from "./SkeletonLoad";

const TodosContainer = ({
  // todos,
  set,
  // initialLoad
}) => {
  const {
    todos,
    totalTodos,
    getTodos,
    getSet,
    doneTodos,
    // showAlert,
    isLoading,
    setFound,
    setLoading,
    changeSetPage,
    // set
  } = useAppContext()

  const [initialLoad, setInitialLoad] = useState(true)
  // const [todos, setTodos] = useState([])

  // const location = useLocation();

  // const set = location.state.belongsTo;

  const location = useLocation().pathname;
  const splitLoc = location.split('/');
  const setId = splitLoc[splitLoc.length - 1]
  // console.log(setId)
  // const verify = setId == undefined ? setId : set

  // console.log(getSet)
  // console.log(setId)
  const asyncFetch = async () => {
    // const todos = 
    await getTodos(setId)
    // setTodos(todos)
    setInitialLoad(false)
  }


  useEffect(() => {
    // getSet(setId)
    // getTodos(setId);
    // setInitialLoad(false);
    if (!setLoading) asyncFetch();
  }, [setLoading])

  // console.log(todos)

  // if (isLoading) {
  //   return <Loading />
  // }

  // console.log(todos)

  return (
    <React.Fragment>
      {/* {!todos && <Navigate to="/404" />} */}
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
          <div className="skeletons" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1rem" }}>
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