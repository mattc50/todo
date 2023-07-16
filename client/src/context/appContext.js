import React, { useEffect, useReducer, useContext, useState } from 'react';
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
  // SET_EDIT_TODO,
  EDIT_TODO_BEGIN,
  EDIT_TODO_SUCCESS,
  EDIT_TODO_ERROR,
  CREATE_TODO_BEGIN,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_ERROR
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
  // errors: {}
  todos: [],
  totalTodos: 0,
  editTodoId: '',
  isEditing: false,
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

  const testGet = async () => {
    try {
      const { data } = await authFetch('/todo');
      //console.log(data)
    } catch (error) {
      logoutUser()
    }
  }

  const getTodos = async () => {
    dispatch({ type: GET_TODOS_BEGIN })
    try {
      const { data } = await authFetch('/todo')
      const { todos, totalTodos } = data;
      dispatch({
        type: GET_TODOS_SUCCESS,
        payload: { todos, totalTodos }
      })
      // console.log(data)
      // return data;
    } catch (error) {
      logoutUser()
    }
  }

  const updateStatus = async (
    id,
    status,
    item,
    animIn
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
      await getTodos()

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

  const updateTask = async (id, task) => {
    dispatch({ type: EDIT_TODO_BEGIN })

    try {
      await authFetch.patch(`/todo/${id}`, { task })

      dispatch({ type: EDIT_TODO_SUCCESS })
      await getTodos()

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

  const createTodo = async (task) => {
    dispatch({ type: CREATE_TODO_BEGIN })
    try {
      await authFetch.post('/todo', { task })
      dispatch({ type: CREATE_TODO_SUCCESS })
      await getTodos()
    } catch (error) {
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
        testGet,
        getTodos,
        updateStatus,
        updateTask,
        createTodo
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
