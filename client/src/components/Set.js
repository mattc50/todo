import Wrapper from '../assets/wrappers/Set'
import moment from "moment";

const Set = ({
  name,
  todos,
  createdAt
}) => {
  let date = moment(createdAt);
  date = date.format(`MMMM D, YYYY`);
  let numTodos = todos.length;

  return (
    <Wrapper>
      <h3>{name}</h3>
      <p>{date}</p>
      <p>{numTodos} todo{numTodos !== 1 && 's'}</p>
    </Wrapper>
  )
}

export default Set;