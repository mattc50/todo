import { initialState } from './appContext';

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
  GET_TODOS_BEGIN,
  GET_TODOS_SUCCESS,

  GET_TODOS_ERROR,

  // PROMPT_FIELD_ERRORS,
  EDIT_TODO_BEGIN,
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
  SET_NOT_FOUND,
  SET_FOUND,
  EDIT_SET_BEGIN,
  EDIT_SET_SUCCESS,
  EDIT_SET_ERROR,
  DELETE_SET_BEGIN,
  DELETE_SET_SUCCESS,
  DELETE_SET_ERROR,

  CLEAR_FOUND,
  SET_INVALID,
  SET_LOADING

} from "./actions";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!"
    }
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: ''
    }
  }

  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Created! Redirecting...'
    }
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg
    }
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: 'Login Successful! Redirecting...'
    }
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar
    }
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userLoading: false
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
    }
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === GET_CURRENT_USER_BEGIN) {
    return {
      ...state,
      userLoading: true,
      fetch: true,
      showAlert: false
    };
  }

  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      userLoading: false,
      user: action.payload.user
    };
  }

  // if (action.type === PROMPT_FIELD_ERRORS) {
  //   return {
  //     ...state,
  //     errors: action.payload.errors
  //   }
  // }

  if (action.type === SET_LOADING) {
    return {
      ...state,
      // setLoading: true
    }
  }

  if (action.type === GET_TODOS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      // setFound: false,
      // showAlert: false
      set: null,
      // setLoading: true,
    }
  }

  if (action.type === GET_TODOS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      // setLoading: false,
      // setFound: true,
      todos: action.payload.todos,
      totalTodos: action.payload.totalTodos,
      doneTodos: action.payload.doneTodos,
      set: action.payload.set
    }
  }

  if (action.type === GET_TODOS_ERROR) {
    return {
      ...state,
      isLoading: false,
      // setFound: false,
      // setLoading: false
    }
  }

  if (action.type === EDIT_TODO_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === EDIT_TODO_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      // showAlert: true,
      // alertType: 'success',
      // alertText: 'Job Updated!'
    }
  }

  if (action.type === EDIT_TODO_ERROR) {
    return {
      ...state,
      isLoading: false
    }
  }

  if (action.type === CREATE_TODO_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === CREATE_TODO_SUCCESS) {
    return {
      ...state,
      isLoading: false
    }
  }

  if (action.type === CREATE_TODO_ERROR) {
    return {
      ...state,
      isLoading: false
    }
  }

  if (action.type === DELETE_TODO_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === DELETE_TODO_SUCCESS) {
    return {
      ...state,
      isLoading: false
    }
  }

  if (action.type === DELETE_TODO_ERROR) {
    return {
      ...state,
      isLoading: false
    }
  }

  if (action.type === CREATE_SET_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === CREATE_SET_SUCCESS) {
    return {
      ...state,
      isLoading: false
    }
  }

  if (action.type === CREATE_SET_ERROR) {
    return {
      ...state,
      isLoading: false
    }
  }

  if (action.type === GET_SETS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      // setLoading: false,
      // showAlert: false
    }
  }

  if (action.type === GET_SETS_SUCCESS) {
    // console.log('success!')
    return {
      ...state,
      isLoading: false,
      sets: action.payload.sets
    }
  }

  // if (action.type === CHANGE_SET_PAGE) {
  //   return {
  //     ...state,
  //     set: action.payload.set
  //   }
  // }

  if (action.type === GET_SET_BEGIN) {
    return {
      ...state,
      isLoading: true,
      // setLoading: true
    }
  }

  if (action.type === GET_SET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      setFound: true,
      setLoading: false,
      set: action.payload.set
    }
  }

  if (action.type === EDIT_SET_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === EDIT_SET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    }
  }

  if (action.type === EDIT_SET_ERROR) {
    return {
      ...state,
      isLoading: false
    }
  }

  if (action.type === SET_NOT_FOUND) {
    return {
      ...state,
      setNotFound: true
    }
  }

  if (action.type === SET_FOUND) {
    return {
      ...state,
      setNotFound: false
    }
  }

  if (action.type === CLEAR_FOUND) {
    return {
      ...state,
      setFound: true
    }
  }

  if (action.type === SET_INVALID) {
    return {
      ...state,
      setFound: false
    }
  }

  if (action.type === DELETE_SET_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === DELETE_SET_SUCCESS) {
    return {
      ...state,
      isLoading: false
    }
  }

  if (action.type === DELETE_SET_ERROR) {
    return {
      ...state,
      isLoading: false
    }
  }

  throw new Error(`no such action: ${action.type}`);
}

export default reducer;