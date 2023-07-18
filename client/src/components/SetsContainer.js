import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SetsContainer";
import Set from "./Set";
import { NavLink } from "react-router-dom"

const SetsContainer = ({ sets }) => {
  console.log(sets)
  const { getSets } = useAppContext();
  useEffect(() => {
    getSets();
  }, [])
  return (
    <Wrapper>

      <h5>Sets</h5>
      {sets.map((set, index) => {
        return (
          <NavLink to="set">
            <Set key={set._id} item={index} {...set} />
          </NavLink>
        )
      })}
    </Wrapper>
  )

}

export default SetsContainer;