import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  VERIFY_USER_TOKEN,
  VERIFY_USER_TOKEN_SUCCESS,
  VERIFY_USER_TOKEN_FAILED,
  USER_CREATE_CHILD,
  USER_CREATE_CHILD_SUCCESS,
  USER_CREATE_CHILD_FAILED,
  USER_FETCH_DETAIL,
  USER_FETCH_DETAIL_SUCCESS,
  USER_FETCH_DETAIL_FAILED,
  USER_EDIT_ITEM,
  USER_EDIT_ITEM_SUCCESS,
  USER_EDIT_ITEM_FAILED

} from './../constants/UserConstants'

const initialState = {
  list: [],
  detail: {},
  loggedIn: {},
  created: {},
  edit: {},
  register: {
    success: false,
    loading: false,
    response: null
  },
  login: {
    success: false,
    loading: true,
    token: null
  },
  createChild: {
    user: {},
    userInfo: {},
    admins: [],
    invites: {},
    success: false,
    loading: false
  }
}

export function UserReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { 
        ...state,
        login: {
          ...state.login,
          loading: true
        }
      }
    case USER_LOGIN_SUCCESS:
      return { 
        ...state,
        login: {
          ...state.login,
          loading: false,
          success: true,
          token: action.data.token
        }
      }
    case USER_LOGIN_FAILED:
      return { 
        ...state,
        login: {
          ...state.login,
          loading: false,
          success: false
        }
      }
    case USER_REGISTER:
      return { 
        ...state,
        register: {
          ...state.register,
          loading: true
        }
      }
    case USER_REGISTER_SUCCESS:
      return { 
        ...state,
        register: {
          ...state.register,
          success: true,
          loading: false
        }
      }
    case USER_REGISTER_FAILED:
      return { 
        ...state,
        register: {
          ...state.register,
          success: false,
          loading: false
        }
      }
    case VERIFY_USER_TOKEN:
      return { 
        ...state,
        login: {
          ...state.login,
          success: false,
          loading: true
        }
      }
    case VERIFY_USER_TOKEN_FAILED:
      return { 
        ...state,
        login: {
          ...state.login,
          success: false,
          loading: false
        }
      }
    case VERIFY_USER_TOKEN_SUCCESS:
      return { 
        ...state,
        login: {
          ...state.login,
          success: true,
          loading: false
        },
        loggedIn: {
          ...state.action,
          ...action.data
        }
      }
    case USER_CREATE_CHILD: 
      return {
        ...state,
        createChild: {
          ...state.createChild,
          loading: true
        }
      }
    case USER_CREATE_CHILD_SUCCESS: 
      return {
        ...state,
        createChild: {
          ...state.createChild,
          loading: false,
          success: true,
          detail: action.data.data
        }
      }
    case USER_FETCH_DETAIL: 
      return {
        ...state,
        detail: {}
      }

    case USER_FETCH_DETAIL_SUCCESS: 
      return {
        ...state,
        detail: action.data
      }

    case USER_FETCH_DETAIL_FAILED: 
      return {
        ...state,
        detail: {}
      }
    

    case USER_EDIT_ITEM: 
      return {
        ...state,
        edit: {}
      }
    case USER_EDIT_ITEM_SUCCESS: 
      return {
        ...state,
        edit: action.data
      }
    case USER_EDIT_ITEM_FAILED: 
      return {
        ...state,
        edit: {}
      }

    default:
      return state
  }
}
