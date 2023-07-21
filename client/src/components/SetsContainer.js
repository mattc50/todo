import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SetsContainer";
import Set from "./Set";
import SkeletonSet from "./SkeletonSet";
import { NavLink, Link, useLocation } from "react-router-dom"
import { MdDelete } from 'react-icons/md'

const SetsContainer = ({ sets }) => {
  // console.log(sets)

  const { getSets, getSet, isLoading, deleteSet } = useAppContext();
  useEffect(() => {
    getSets();
  }, [])
  return (
    <Wrapper>

      <h5>Sets</h5>
      {sets.map((set, index) => {
        return (
          <React.Fragment key={index}>
            {isLoading ?
              <SkeletonSet />
              :
              <div className="set-item" key={set._id}>
                <div className="set-container">
                  <Link
                    className="set-link"
                    to={`/set/${set._id}`}
                    state={{ belongsTo: `${set._id}` }}
                    onClick={() => getSet(set._id)}
                  >
                    <Set set={set._id} item={index} {...set} />
                  </Link>
                  <div className="form-action-container">
                    <button
                      className="form-action delete"
                      onClick={(e) => {
                        deleteSet(set._id)
                      }
                      }
                      disabled={isLoading}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>}
          </React.Fragment>
        )
      })}
    </Wrapper >
  )

}

export default SetsContainer;