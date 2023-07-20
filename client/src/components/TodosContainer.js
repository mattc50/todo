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

const TodosContainer = ({ todos, set }) => {
  const {
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

  // const location = useLocation();

  // const set = location.state.belongsTo;
  // const splitLoc = location.pathname.split('/');
  // const getSet = splitLoc[splitLoc.length - 1]

  const setId = useParams().id;
  // const verify = setId == undefined ? setId : set

  // console.log(getSet)
  // console.log(setId)

  useEffect(() => {
    // getSet(setId)
    getTodos(setId)
  }, [setFound])
  // console.log(todos)

  // if (isLoading) {
  //   return <Loading />
  // }

  return (
    <React.Fragment>
      {/* {!todos && <Navigate to="/404" />} */}
      <Wrapper>
        {/* {showAlert && <Alert />} */}
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
        <TodoNew set={setId} />
      </Wrapper>
    </React.Fragment>
  )
}

export default TodosContainer;