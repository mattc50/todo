import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Todo";
import { useState } from "react";
import { MdAdd, MdDone } from "react-icons/md"

const TodoNew = ({ set }) => {
  const { createTodo, isLoading } = useAppContext();
  const [text, setText] = useState('');

  const handleBlur = () => {
    if (!text.trim()) {
      setText('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const submitTask = text.trim();
    if (submitTask) {
      createTodo(submitTask, set)
      setText('')
    }
    return false;
  }

  return (
    <Wrapper className="todo-new">
      <form className="todo-item new" onSubmit={handleSubmit}>
        <div className="add">
          <MdAdd />
        </div>
        {isLoading ?
          <div className="skeleton" />
          :
          <input
            className="form-input task"
            area-label="new-todo"
            type="text"
            name="task"
            placeholder="New Todo"
            value={text}
            onBlur={handleBlur}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
          />
        }
        <button
          type="submit"
          className="form-action submit"
          disabled={!text || isLoading}
        >
          <MdDone />
        </button>
      </form >
    </Wrapper >
  )
}

export default TodoNew;