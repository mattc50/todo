import moment from "moment";
import { useAppContext } from "../context/appContext";
import Wrapper from '../assets/wrappers/Todo'
import { useState, useEffect } from "react";


const Todo = ({ item, _id, task, status }) => {
  const { updateStatus, isLoading, updateTask } = useAppContext()
  const [state, setState] = useState(status)
  const [validTask, setValidTask] = useState(task)
  const [text, setText] = useState(task)

  const handleBlur = (e) => {
    if (text.trim() === '') setText(validTask)
    else setValidTask(text)
  }

  const handleChange = () => {
    // const el = document.getElementById(`todo-${item}`);

    // const animIn = status ? 'c-out-in' : 'c-in-in'
    // el.classList.add(animIn);
    setState(!state)
    updateStatus(
      _id,
      !state,
      item
      // animIn
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateTask(
      _id,
      text
    )
    return false;
  }


  return (
    <Wrapper>

      <div id="todo-form">
        <form onSubmit={handleSubmit}>
          <div className="status-container">
            <div
              className={"checkbox-container"}
              // this may have to be revised when day-grouped lists are introduced
              id={`todo-${item}`}
            // style={isLoading ? { animation: 'uncheckToCheck 1s linear' } : {}}
            >
              <input
                type="checkbox"
                name="status"
                checked={status}
                // disabled={isLoading}
                // onClick={handleClick}
                onChange={handleChange}
                onSubmit={handleSubmit}
                className="checkbox"
              />
              <span className="checkmark" />
            </div>
          </div>
          <input
            className="task-field"
            aria-label="task"
            type="text"
            name="task"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
          />
        </form>
      </div>

    </Wrapper>
  )
}

export default Todo