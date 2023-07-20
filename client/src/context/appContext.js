import React, { useEffect, useReducer, useContext } from 'react';
import reducer from './reducer';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  // PROMPT_FIELD_ERRORS
  GET_TODOS_BEGIN,
  GET_TODOS_SUCCESS,
  EDIT_TODO_BEGIN,

  GET_TODOS_ERROR,

  EDIT_TODO_SUCCESS,
  EDIT_TODO_ERROR,
  CREATE_TODO_BEGIN,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_ERROR,
  DELETE_TODO_BEGIN,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  CREATE_SET_BEGIN,
  CREATE_SET_SUCCESS,
  CREATE_SET_ERROR,
  GET_SETS_BEGIN,
  GET_SETS_SUCCESS,
  GET_SET_BEGIN,
  GET_SET_SUCCESS,
  EDIT_SET_BEGIN,
  EDIT_SET_SUCCESS,
  EDIT_SET_ERROR,

  CLEAR_FOUND,

  SET_NOT_FOUND,
  SET_FOUND,
} from './actions';
import axios from 'axios';

const AppContext = React.createContext();

export const initialState = {
  // userLoading will be for when the app is refreshed and the user is being retrieved/validated.
  // it is set to true to prevent being immediately logged out.
  userLoading: true,
  userFetched: false,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  showSidebar: false,
  // errors: {},
  todos: [],
  set: '',
  sets: [],
  totalTodos: 0,
  doneTodos: 0,
  editTodoId: '',
  isEditing: false,
  setFound: true,
  setLoading: false
}

const AppProvider = ({ children }) => {

  const authFetch = axios.create({
    baseURL: '/api/v1',
  })

  // request interceptor
  // authFetch.interceptors.request.use(
  //   (config) => {
  //     config.headers['Authorization'] = `Bearer ${state.token}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  // response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      //console.log(error.response);
      if (error.response.status === 401) {
        console.log('logging out')
        logoutUser();
      }
      // if (error.response.status === 404) {
      //   console.log('logging out')
      //   logoutUser();
      // }
      return Promise.reject(error);
    }
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000);
  }

  const clearAlertInstant = () => {
    dispatch({ type: CLEAR_ALERT })
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      // POST method will be used, as we are sending data to the server
      const response = await axios.post(
        '/api/v1/auth/register', currentUser
      )
      //console.log(response)
      const { user } = response.data
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user }
      })
    } catch (error) {
      //console.log(error);

      // ADDITION:  an action has been added to store any errors raised in 
      //            a new global context value, errors. This list is 
      //            retrieved from the data inside the response when an 
      //            error is raised from the error-handler middleware.
      //            This value is used by the Register and Login forms to 
      //            display validation errors alongside the fields they 
      //            belong to. 
      // dispatch({
      //   type: PROMPT_FIELD_ERRORS,
      //   payload: { errors: error.response.data.list }
      // })

      dispatch({
        type: REGISTER_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
          errors: error.response.data.list
        }
      })
    }
    clearAlert();
  }

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post('/api/v1/auth/login', currentUser);
      const { user } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user }
      })
    } catch (error) {
      // dispatch({
      //   type: PROMPT_FIELD_ERRORS,
      //   payload: { errors: error.response.data.list }
      // })
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
          errors: error.response.data.list
        }
      });
    }
    clearAlert();
  }

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = async () => {
    await authFetch.get('/auth/logout');
    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch(
        '/auth/update', currentUser
      )
      const { user } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user }
      });

    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg }
        })
      }
    }
    clearAlert();
  }

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch('/auth/getCurrentUser');
      const { user } = data
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user }
      })
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }
      logoutUser();
    };

  }

  const getTodos = async (setId) => {
    // console.log(setId)
    dispatch({ type: GET_TODOS_BEGIN })
    try {
      // console.log(setId)
      // await getSet(setId);
      // console.log('done 1')
      const { data } = await authFetch(`/todo/all/${setId}`)
      // console.log('done 2')
      const { todos, totalTodos, doneTodos, todosOfSet, todoIdsInSet } = data;
      // console.log(todos)

      // console.log(todosOfSet)
      // console.log(todoIdsInSet)
      const nullsFiltered = todoIdsInSet
        .filter(todo => todosOfSet.some(el => el == todo))
      // console.log(nullsFiltered)
      if (nullsFiltered.length > 0 && todoIdsInSet.length !== todosOfSet.length)
        await authFetch.patch(`/set/${setId}`, { todos: nullsFiltered })
      dispatch({
        type: GET_TODOS_SUCCESS,
        payload: { setId, todos, totalTodos, doneTodos }
      })
      // console.log(data)
      // return data;
    } catch (error) {
      dispatch({ type: GET_TODOS_ERROR })
      if (error.response.status === 404) {
        return;
      }
      logoutUser()
    }
  }

  // const setFound = () => {
  //   dispatch({ type: SET_FOUND })
  // }

  const updateStatus = async (
    id,
    status,
    item,
    animIn,
    setId
  ) => {
    const el = document.getElementById(`todo-${item}`);

    // const animIn = status ? 'c-in-in' : 'c-out-in'
    el.classList.add(animIn);

    dispatch({ type: EDIT_TODO_BEGIN })

    try {
      // const todo = state.todos.find((todo) => todo._id === id)
      // // const { status } = todo;
      await authFetch.patch(`/todo/${id}`, { status })

      dispatch({ type: EDIT_TODO_SUCCESS })
      await getTodos(setId)

      el.classList.remove(animIn);
      const animOut = status ? 'c-in-out' : 'c-out-out'
      el.classList.add(animOut);
      setTimeout(() => {
        el.classList.remove(animOut);
      }, 1000)

    } catch (error) {
      if (error.response.status === 401) {
        return
      }
      dispatch({
        type: EDIT_TODO_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
  }

  const updateTask = async (id, task, setId) => {
    dispatch({ type: EDIT_TODO_BEGIN })

    try {
      await authFetch.patch(`/todo/${id}`, { task })

      dispatch({ type: EDIT_TODO_SUCCESS })
      await getTodos(setId)

    } catch (error) {
      if (error.response.status === 401) {
        return
      }
      dispatch({
        type: EDIT_TODO_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
  }

  // ADDITION:  this function will push a Todo to the array of Sets it belongs to.
  //            it will first fetch a Todo by the provided todoId.
  //            then, the response is parsed, and the belongsTo array of the Todo 
  //            object is stored in belongsTo.
  //            next, the provided setId is pushed to the belongsTo array, adding a 
  //            new Set to it.
  //            last, the Todo object is updated with the new Set array in belongsTo.
  const pushSetToTodo = async (todoId, setId) => {
    dispatch({ type: EDIT_TODO_BEGIN })

    try {
      const response = await authFetch(`/todo/${todoId}`)
      console.log(response)
      let belongsTo = response.data.todo.belongsTo;
      console.log(belongsTo)

      // search in the belongsTo array to see if the Set already exists in it
      if (!belongsTo.includes(setId)) {
        belongsTo.push(setId);
        console.log(belongsTo)
        await authFetch.patch(`/todo/${todoId}`, { belongsTo })
      }
      dispatch({ type: EDIT_TODO_SUCCESS })

    } catch (error) {
      if (error.response.status === 401) {
        return
      }
      dispatch({
        type: EDIT_TODO_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
  }

  // ADDITION:  * not sure of revelance right now *
  //            takes in a Todo and Set, and removes the Set from the Todo's 
  //            belongsTo array.
  const popSetFromTodo = async (todoId, setId) => {
    dispatch({ type: EDIT_TODO_BEGIN })
    try {
      const response = await authFetch(`/todo/${todoId}`)
      const belongsTo = response.data.todo.belongsTo;
      const filterOutSet = belongsTo.filter(set => set !== setId)
      await authFetch.patch(`/todo/${todoId}`, { filterOutSet })
      dispatch({ type: EDIT_TODO_SUCCESS })

    } catch (error) {
      if (error.response.status === 401) {
        return
      }
      dispatch({
        type: EDIT_TODO_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
  }

  const pushTodoToSet = async (todoId, setId) => {
    dispatch({ type: EDIT_SET_BEGIN })

    try {
      const response = await authFetch(`/set/${setId}`)
      const todos = response.data.set.todos;
      if (!todos.includes(todoId)) {
        todos.push(todoId);
        await authFetch.patch(`/set/${setId}`, { todos })
      }
      dispatch({ type: EDIT_SET_SUCCESS })


    } catch (error) {
      if (error.response.status === 401) {
        return
      }
      dispatch({
        type: EDIT_SET_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
  }

  const popTodoFromSet = async (todoId, setId) => {
    dispatch({ type: EDIT_SET_BEGIN })

    try {
      const response = await authFetch(`/set/${setId}`)
      const todos = response.data.set.todos;
      const filterOutTodo = todos.filter(todo => todo !== todoId)
      await authFetch.patch(`/set/${setId}`, { filterOutTodo })
      dispatch({ type: EDIT_SET_SUCCESS })
    } catch (error) {
      if (error.response.status === 401) {
        return
      }
      dispatch({
        type: EDIT_TODO_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
  }

  const createTodo = async (task, setId) => {
    dispatch({ type: CREATE_TODO_BEGIN })
    try {
      const todo = await authFetch.post('/todo', { task, belongsTo: setId })
      const todoId = todo.data.todo._id;
      // console.log(todoId)
      // console.log(setId)
      await pushSetToTodo(todoId, setId)
      await pushTodoToSet(todoId, setId)
      dispatch({ type: CREATE_TODO_SUCCESS })
      await getTodos(setId)
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) {
        return
      }
      dispatch({
        type: CREATE_TODO_ERROR,
        payload: {
          msg: error.response.data.msg
        }
      })
    }
  }

  const deleteTodo = async (todoId, setId) => {
    dispatch({ type: DELETE_TODO_BEGIN });
    try {
      await popTodoFromSet(todoId, setId);
      await authFetch.delete(`todo/${todoId}`);
      dispatch({ type: DELETE_TODO_SUCCESS })
      await getTodos(setId);
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }
      dispatch({
        type: DELETE_TODO_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
  }

  const createSet = async (
    // todos
  ) => {
    dispatch({ type: CREATE_SET_BEGIN })
    try {
      const response = await authFetch.post(
        '/set',
        //{ todos }
      )

      // const set = response.data.set._id;
      // const todosArray = response.data.set.todos;
      // todosArray.map(todo => pushSetToTodo(todo, set))

      dispatch({ type: CREATE_SET_SUCCESS })
      await getSets();
    } catch (error) {
      if (error.response.status === 401) {
        return
      }
      dispatch({
        type: CREATE_SET_ERROR,
        payload: {
          msg: error.response.data.msg
        }
      })
    }
  }

  const getSets = async () => {
    dispatch({ type: GET_SETS_BEGIN })
    try {
      const { data } = await authFetch('/set')
      const { sets } = data;
      dispatch({
        type: GET_SETS_SUCCESS,
        payload: { sets }
      })
    } catch (error) {
      logoutUser()
    }
  }

  const getSet = async (setId) => {
    dispatch({ type: GET_SET_BEGIN })
    try {
      const { data } = await authFetch(`/set/${setId}`)
      // console.log(data)
      const { set } = data;
      // console.log(set)
      const id = set._id;
      // console.log(id)
      dispatch({
        type: GET_SET_SUCCESS,
        payload: { id }
      })
    } catch (error) {
      if (error.response.status === 404) {
        return;
      }
      logoutUser()
    }
  }

  // const changeSetPage = (set) => {
  //   dispatch({
  //     type: CHANGE_SET_PAGE,
  //     payload: { set }
  //   })
  // }
  const clearFound = () => {
    dispatch({ type: CLEAR_FOUND })
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlertInstant,
        registerUser,
        loginUser,
        logoutUser,
        toggleSidebar,
        updateUser,

        getTodos,
        updateStatus,
        updateTask,
        createTodo,
        deleteTodo,

        createSet,
        getSets,
        getSet,

        // changeSetPage,
        clearFound
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
