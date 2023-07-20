import { useAppContext } from "../context/appContext";
import Wrapper from '../assets/wrappers/Set'
import moment from "moment";
import { useEffect } from "react";

const Set = ({ item, set, todos, createdAt }) => {
  let date = moment(createdAt);
  date = date.format(`MMMM D, YYYY`);
  let numTodos = todos.length;

  return (
    <Wrapper>
      <div className="set-info">
        <h3>{date}</h3>
        <p>{numTodos} todo{numTodos !== 1 && 's'}</p>
      </div>
    </Wrapper>
  )
}

export default Set;