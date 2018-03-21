import {
  POST_FETCH_LIST,
  POST_FETCH_LIST_SUCCESS,
  POST_FETCH_LIST_FAILED,

  POST_FETCH_DETAIL,
  POST_FETCH_DETAIL_SUCCESS,
  POST_FETCH_DETAIL_FAILED,

  POST_CREATE_ITEM,
  POST_CREATE_ITEM_SUCCESS,
  POST_CREATE_ITEM_FAILED,

  POST_CREATE_ITEM_PART,
  POST_CREATE_ITEM_PART_SUCCESS,
  POST_CREATE_ITEM_PART_FAILED
} from './../constants/PostConstants'

const initialState = {
  list: [],
  detail: {
    parts: [],
    data: {}
  },
  created: {
    parts: [],
    addPart: false,
    data: {}
  },
  loading: false,
  success: false
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
      return {
        ...state,
        success: false,
        loading: true

      }
    case POST_CREATE_ITEM_SUCCESS:
      const newParts = [
        {
          content: 'Create content',
          order: 0,
          post_id: action.data.uuid   
        }
      ]
      return {
        ...state,
        loading: false,
        success: true,
        created: {
          ...state.created,
          data: action.data,
          parts: newParts
        }
      }
    case POST_CREATE_ITEM_FAILED:
      return {
        ...state,
        success: false,
        loading: false
      }

    case POST_CREATE_ITEM_PART:
      return {
        ...state,
        success: false,
        loading: true

      }
    case POST_CREATE_ITEM_PART_SUCCESS:
      const newPartList = [
        ...action.data,
        {
          content: 'Create content',
          order: 0,
          post_id: action.data.uuid   
        }
      ]
      return {
        ...state,
        loading: false,
        success: true,
        created: {
          ...state.created,
          parts: newPartList
        }
      }
    case POST_CREATE_ITEM_PART_FAILED:
      return {
        ...state,
        success: false,
        loading: false
      }
    default:
      return state
  }
}
