import { useAppContext } from "../context/appContext";
import Wrapper from '../assets/wrappers/Set'
import moment from "moment";
import { useEffect } from "react";
import { MdDelete } from 'react-icons/md'
import { useLocation } from "react-router-dom";


const Set = ({
  item,
  name,
  //set,
  todos,
  createdAt
}) => {
  let date = moment(createdAt);
  date = date.format(`MMMM D, YYYY`);
  let numTodos = todos.length;

  const { deleteSet, isLoading } = useAppContext();

  return (
    <Wrapper>
      <h3>{name}</h3>
      {/* <div className="set-info"> */}
      <p>{date}</p>
      <p>{numTodos} todo{numTodos !== 1 && 's'}</p>
      {/* </div> */}
    </Wrapper>
  )
}

export default Set;