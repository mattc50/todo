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
      <h5>{date}</h5>
      <p>{numTodos}</p>
    </Wrapper>
  )
}

export default Set;