import { useAppContext } from "../context/appContext";
import Wrapper from '../assets/wrappers/Set'
import moment from "moment";
import { useEffect } from "react";
import { MdDelete } from 'react-icons/md'


const Set = ({ item, set, todos, createdAt }) => {
  let date = moment(createdAt);
  date = date.format(`MMMM D, YYYY`);
  let numTodos = todos.length;

  const { deleteSet, isLoading } = useAppContext();

  return (
    <Wrapper>
      <h3>{date}</h3>
      <p>{numTodos} todo{numTodos !== 1 && 's'}</p>
    </Wrapper>
  )
}

export default Set;