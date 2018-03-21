import {
  CHILD_CREATE_ITEM,
  CHILD_CREATE_ITEM_SUCCESS,
  CHILD_CREATE_ITEM_FAILED,
  
  CHILD_CREATE_INFO,
  CHILD_CREATE_INFO_SUCCESS,
  CHILD_CREATE_INFO_FAILED,

  CHILD_LIST_ADMINS,
  CHILD_LIST_ADMINS_SUCCESS,
  CHILD_LIST_ADMINS_FAILED,

  CHILD_CREATE_ADMIN,
  CHILD_CREATE_ADMIN_SUCCESS,
  CHILD_CREATE_ADMIN_FAILED

} from './../constants/ChildConstants'

const initialState = {
  detail: {},
  userInfo: {},
  admins: [],
  invites: {},
  success: false,
  loading: false
}

export function ChildReducer(state = initialState, action) {
  switch (action.type) {
    case CHILD_CREATE_ITEM: 
      return {
        ...state,
        loading: true
      }
    case CHILD_CREATE_ITEM_SUCCESS: 
      return {
        ...state,
        loading: false,
        success: true,
        detail: action.data
      }

    case CHILD_CREATE_ITEM_FAILED: 
      return {
        ...state,
        loading: false,
        success: false,
        detail: {}
      }

    case CHILD_CREATE_INFO: 
      return {
        ...state,
        loading: true
      }
    case CHILD_CREATE_INFO_SUCCESS: 
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.data
      }

    case CHILD_CREATE_INFO_FAILED: 
      return {
        ...state,
        loading: false,
        success: false,
        userInfo: {}
      }

    case CHILD_LIST_ADMINS: 
      return {
        ...state,
        admins: [],
        loading: true,
        success: false
      }

    case CHILD_LIST_ADMINS_SUCCESS: 
      return {
        ...state,
        admins: action.data,
        loading: false,
        success: true
      }

    case CHILD_LIST_ADMINS_FAILED: 
      return {
        ...state,
        admins: [],
        loading: false,
        success: false
      }

    case CHILD_CREATE_ADMIN: 
      return {
        ...state,
        loading: true,
        success: false
      }

    case CHILD_CREATE_ADMIN_SUCCESS: 
      return {
        ...state,
        loading: false,
        success: true
      }

    case CHILD_CREATE_ADMIN_FAILED: 
      return {
        ...state,
        loading: false,
        success: false
      }

    default:
      return state
  }
}
