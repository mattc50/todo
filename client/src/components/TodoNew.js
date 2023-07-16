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
      <form onSubmit={handleSubmit}>
        <div className="add">
          <MdAdd />
        </div>
        <input
          className="form-input task new"
          area-label="new-todo"
          type="text"
          name="task"
          placeholder="New Todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="submit-task">
          <MdDone />
        </button>
      </form>
    </Wrapper>
  )
}

export default TodoNew;