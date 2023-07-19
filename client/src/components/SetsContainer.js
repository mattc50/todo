import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SetsContainer";
import Set from "./Set";
import { NavLink, useLocation } from "react-router-dom"

const SetsContainer = ({ sets }) => {
  console.log(sets)

  const { getSets, getSet } = useAppContext();
  useEffect(() => {
    getSets();
  }, [])
  return (
    <Wrapper>

      <h5>Sets</h5>
      {sets.map((set, index) => {
        return (
          <NavLink
            key={set._id}
            to={`/set/${set._id}`}
            state={{ belongsTo: `${set._id}` }}
            onClick={() => getSet(set._id)}
          >
            <Set set={set._id} item={index} {...set} />
          </NavLink>
        )
      })}
    </Wrapper >
  )

}

export default SetsContainer;