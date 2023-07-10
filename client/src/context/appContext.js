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
  GET_CURRENT_USER_SUCCESS
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
  showSidebar: false
};

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

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      // POST method will be used, as we are sending data to the server
      const response = await axios.post(
        '/api/v1/auth/register', currentUser
      )
      console.log(response)
      const { user } = response.data
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user }
      })
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg }
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
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg }
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

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        logoutUser,
        toggleSidebar,
        updateUser,
        testGet
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
