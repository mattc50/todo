// import moment from "moment";
import { useAppContext } from "../context/appContext";
import Wrapper from '../assets/wrappers/Todo'
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useLocation, Link } from "react-router-dom";

const Todo = ({ item, _id, task, status, belongsTo }) => {
  const { updateStatus, updateTask, deleteTodo, isLoading, set } = useAppContext()
  const [state, setState] = useState(status)
  const [validTask, setValidTask] = useState(task)
  const [text, setText] = useState(task)

  // determines if the current page is /todos.
  // if it is, the the ID of the Set the todo belongs to is shown in place of the 
  // "remove todo" button.
  const location = useLocation().pathname;
  const splitLoc = location.split('/');
  const page = splitLoc[splitLoc.length - 1]

  const handleBlur = (e) => {
    setter()
    if (!(validTask == text)) {
      handleSubmit(e)
    }
  }

  const setter = () => {
    if (text.trim() === '') {
      setText(validTask);
    } else {
      setValidTask(text);
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
      animIn,

      // check if there is a Set; if there is not, send null as the Set
      set ? set._id : null
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
      updateTask(
        _id,
        forSubmit,
        set._id
      )
    }
    return false;
  }

  // console.log(set)

  return (
    <Wrapper>
      <div className="todo-item">
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
                disabled={isLoading}
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
            disabled={isLoading}
          />
        </form>
        {page === 'todos' ?
          <Link
            className="set-ref"
            to={`/set/${belongsTo}`}
          >
            <small>{belongsTo}</small>
          </Link> :
          <button
            className="form-action delete"
            onClick={() => deleteTodo(_id, set._id)}
            disabled={isLoading}
          >
            <MdDelete />
          </button>
        }
      </div>
    </Wrapper>
  )
}

export default Todo