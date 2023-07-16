// import moment from "moment";
import { useAppContext } from "../context/appContext";
import Wrapper from '../assets/wrappers/Todo'
import { useState } from "react";


const Todo = ({ item, _id, task, status }) => {
  const { updateStatus, updateTask } = useAppContext()
  const [state, setState] = useState(status)
  const [validTask, setValidTask] = useState(task)
  const [text, setText] = useState(task)

  const handleBlur = (e) => {
    setter()
    if (!(validTask == text)) {
      handleSubmit(e)
    }
  }

  const setter = () => {
    if (text.trim() === '') {
      setText(validTask);
      // return validTask;
    } else {
      setValidTask(text);
      // return text;
    }
  }

  const handleChange = () => {
    const el = document.getElementById(`todo-${item}`);

    const animIn = status ? 'c-out-in' : 'c-in-in'
    el.classList.add(animIn);
    setState(!state)
    updateStatus(
      _id,
      !state,
      item,
      animIn
    )
  }

  //  to prevent the page from refreshing when the form is submitted, we do the
  //  following:
  //  1.  we bind handleSubmit to the form element rather than a button
  //  2.  we return false at the end of the function
  //  source: https://stackoverflow.com/a/8866137
  const handleSubmit = (e) => {
    e.preventDefault()
    setter()
    if (!(validTask == text)) {
      const forSubmit = text.trim() || validTask;
      // console.log(forSubmit)
      updateTask(
        _id,
        forSubmit
      )
    }
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
            >
              <input
                type="checkbox"
                name="status"
                checked={status}
                // disabled={isLoading}
                onChange={handleChange}
                onSubmit={handleSubmit}
                className="checkbox"
              />
              <span className="checkmark" />
            </div>
          </div>
          <input
            className="form-input task"
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