import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SetsContainer";
import Set from "./Set";
import SkeletonSet from "./SkeletonSet";
import { NavLink, useLocation } from "react-router-dom"

const SetsContainer = ({ sets }) => {
  // console.log(sets)

  const { getSets, getSet, isLoading } = useAppContext();
  useEffect(() => {
    getSets();
  }, [])
  return (
    <Wrapper>

      <h5>Sets</h5>
      {sets.map((set, index) => {
        return (
          <NavLink
            className="set-link"
            key={set._id}
            to={`/set/${set._id}`}
            state={{ belongsTo: `${set._id}` }}
            onClick={() => getSet(set._id)}
          >
            {isLoading ?
              <SkeletonSet />
              :
              <Set set={set._id} item={index} {...set} />
            }
          </NavLink>
        )
      })}
    </Wrapper >
  )

}

export default SetsContainer;