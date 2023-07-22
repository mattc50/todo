import React, { useEffect, useState } from "react"
import { useAppContext } from "../../context/appContext"
import { TextArea, TodosContainer, SetsContainer, Loading, SetNameInput } from "../../components"
import { Navigate, useParams, useLocation } from "react-router-dom"
import Error from '../Error'
import SkeletonLoad from "../../components/SkeletonLoad"

const Set = () => {
  const {
    todos,
    // createSet,
    // sets,
    getSet,
    getTodos,
    set,
    isLoading,
    setFound,
    setNotFound,
    setLoading,
  } = useAppContext()

  // pleaceholder array for the todos value of the Set; contains a single Todo


  const [initialLoad, setInitialLoad] = useState(true)

  const asyncFetch = async (setId) => {
    await getSet(setId);
    setInitialLoad(false)
  }

  const setId = useParams().id || set._id;

  useEffect(() => {
    // console.log('run')
    // getSet(setId)
    // setInitialLoad(false)

    // getTodos(setId)
    asyncFetch(setId);

  }, [setFound])

  // if (isLoading) {
  //   return <Loading />
  // }
  // console.log(`setFound: ${setFound}`)
  // console.log(`setLoading: ${setLoading}`)


  const sampleSet = [
    "64b6ee8c1008085a3bc81d26"
  ]

  // if (setLoading) {
  //   return;
  // }
  // if (setFound && setLoading) {
  //   return <></>;
  // }

  // if (setFound && setLoading) return;

  // if (!setLoading && !setFound) return <Error />;

  // if (!setFound) {
  //   console.log('nothing')
  //   return;
  // }
  // const { _id, name } = set;

  return (
    <React.Fragment>
      {initialLoad &&
        <SkeletonLoad context="setName" />
      }
      {!initialLoad &&
        <div className="name-container">
          <SetNameInput />
          <small className="set-id">{setId}</small>
        </div>
      }
      <TodosContainer todos={todos} set={set} />
      {!initialLoad &&
        <TextArea
          type='text'
          name="Freeform"
        >
        </TextArea>
      }
    </React.Fragment >
  )
}

export default Set