import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Todo";
import { useState } from "react";
import { MdAdd, MdDone } from "react-icons/md"

const TodoNew = () => {
  const { createTodo } = useAppContext();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    const submitTask = text.trim();
    if (submitTask) {
      createTodo(submitTask)
      setText('')
    }
    return false;
  }

  return (
    <Wrapper>
      <form className="todo-item new" onSubmit={handleSubmit}>
        <div className="add">
          <MdAdd />
        </div>
        <input
          className="form-input task"
          area-label="new-todo"
          type="text"
          name="task"
          placeholder="New Todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="form-action submit"
          disabled={!text}
        >
          <MdDone />
        </button>
      </form >
    </Wrapper >
  )
}

export default TodoNew;