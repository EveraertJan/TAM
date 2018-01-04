import { combineReducers } from 'redux'

import { PostReducer } from './PostReducer'

const tellAboutMe = combineReducers({
  post: PostReducer
})

export default tellAboutMe