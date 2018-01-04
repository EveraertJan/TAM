import {
  POST_FETCH_LIST,
  POST_FETCH_LIST_SUCCESS,
  POST_FETCH_LIST_FAILED,

  POST_FETCH_DETAIL,
  POST_FETCH_DETAIL_SUCCESS,
  POST_FETCH_DETAIL_FAILED,

  POST_CREATE_ITEM
} from './../Actions/PostActions'

const initialState = {
  list: [],
  detail: {},
  created: {},
  loading: false
}

export function PostReducer(state = initialState, action) {
  switch (action.type) {
    case POST_FETCH_LIST:
      return { 
        ...state,
        loading: true
      }
    case POST_FETCH_LIST_SUCCESS:
      return {
        ...state,
        list: action.data,
        loading: false
      }
    case POST_FETCH_LIST_FAILED:
      return {
        ...state,
        list: [],
        loading: false
      }

      case POST_FETCH_DETAIL:
      return { 
        ...state,
        loading: true
      }
    case POST_FETCH_DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.data,
        loading: false
      }
    case POST_FETCH_DETAIL_FAILED:
      return {
        ...state,
        detail: {},
        loading: false
      }
      
    case POST_CREATE_ITEM:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    default:
      return state
  }
}
