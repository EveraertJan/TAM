import {
  FILE_UPLOAD_IMAGE,
  FILE_UPLOAD_IMAGE_SUCCESS,
  FILE_UPLOAD_IMAGE_FAILED,

} from './../constants/FileConstants'

import {
  POST_CREATE_ITEM_SUCCESS
} from './../constants/PostConstants.js'

const initialState = {
  image: {
    loading: false,
    success: false,
    data: {}
  }
}

export function FileReducer(state = initialState, action) {
  switch (action.type) {
    case FILE_UPLOAD_IMAGE: 
      return {
        ...state,
        image: {
          ...initialState.image,
          loading: true
        }
      }
    case FILE_UPLOAD_IMAGE_SUCCESS: 
      return {
        ...state,
        image: {
          ...state.image,
          loading: false,
          success: true,
          data: action.data
        }
      }
    case FILE_UPLOAD_IMAGE_FAILED: 
      return {
        ...state,
        image: {
          ...initialState.image,
          loading: false,
          success: false
        }
      }

    case POST_CREATE_ITEM_SUCCESS:
      return {
        ...state,
        image: {
          ...initialState.image,
          loading: false,
          success: false
        }
      }
    
    default:
      return state
  }
}
