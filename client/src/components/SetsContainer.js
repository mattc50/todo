import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SetsContainer";
import Set from "./Set";
import SkeletonSet from "./SkeletonSet";
import { Link } from "react-router-dom"
import { MdDelete } from 'react-icons/md'

const SetsContainer = ({ sets }) => {

  const { getSets, isLoading, deleteSet } = useAppContext();

  const [initialLoad, setInitialLoad] = useState(true)

  const asyncFetch = async () => {
    if (sets.length === 0) await getSets();
    setInitialLoad(false);
  }

  useEffect(() => {
    asyncFetch();
    // eslint-disable-next-line
  }, [])

  return (
    <Wrapper>
      {initialLoad &&
        <div className="skeletons" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1rem" }}>
          <SkeletonSet />
          <SkeletonSet />
        </div>
      }
      {sets.length === 0 && <h5>There are no Sets. Add a Set below!</h5>}
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
                  >
                    <Set
                      item={index}
                      {...set}
                    />
                  </Link>
                  <div className="form-action-container">
                    <button
                      className="form-action delete"
                      onClick={() => { deleteSet(set._id) }
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