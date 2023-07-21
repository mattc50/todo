import React, { useEffect } from "react"
import { useAppContext } from "../../context/appContext"
import { TextArea, TodosContainer, SetsContainer, Loading } from "../../components"
import { Navigate, useParams } from "react-router-dom"
import Error from '../Error'




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
    setLoading
  } = useAppContext()

  // pleaceholder array for the todos value of the Set; contains a single Todo

  const setId = useParams().id;

  useEffect(() => {
    // console.log('run')
    getSet(setId)
    // getTodos(setId)

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

  return (
    <React.Fragment>
      {!setFound && <Error />}
      {setFound && <>
        <h1>Todo Page</h1>
        <TodosContainer todos={todos} set={set} />
        <TextArea
          type='text'
          name="Freeform"
        >
        </TextArea>
      </>}

    </React.Fragment>
  )
}

export default Set