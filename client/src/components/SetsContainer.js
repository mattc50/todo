import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SetsContainer";
import Set from "./Set";
import SkeletonSet from "./SkeletonSet";
import { NavLink, Link, useLocation } from "react-router-dom"
import { MdDelete } from 'react-icons/md'

const SetsContainer = ({ sets }) => {
  // console.log(sets)

  const { getSets, getSet, isLoading, deleteSet } = useAppContext();

  const [initialLoad, setInitialLoad] = useState(true)

  const asyncFetch = async () => {
    await getSets();
    setInitialLoad(false);
  }

  useEffect(() => {
    // getSets()
    asyncFetch();
  }, [])

  return (
    <Wrapper>
      {initialLoad &&
        <div className="skeletons" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1rem" }}>
          <SkeletonSet />
          <SkeletonSet />
        </div>
      }
      {!initialLoad && sets.map((set, index) => {
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
                    state={{ ...set }}
                  // onClick={() => getSet(set._id)}
                  >
                    <Set
                      // set={set._id}
                      item={index}
                      {...set}
                    />
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