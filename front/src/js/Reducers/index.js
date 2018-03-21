import { combineReducers } from 'redux'

import { PostReducer } from './PostReducer'
import { UserReducer } from './UserReducer'
import { GlobalReducer } from './GlobalReducer'
import { ChildReducer } from './ChildReducer'
import { FileReducer } from './FileReducer'

const tellAboutMe = combineReducers({
  post: PostReducer,
  user: UserReducer,
  globals: GlobalReducer,
  child: ChildReducer,
  file: FileReducer
})

export default tellAboutMe