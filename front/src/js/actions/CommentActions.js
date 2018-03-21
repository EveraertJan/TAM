import {
	COMMENT_CREATE_ITEM,
	COMMENT_FETCH_LIST,
	COMMENT_UPDATE_ITEM,
	COMMENT_REMOVE_ITEM
} from './../constants/CommentConstants'

export function CommentFetchList(postId) {
  return {
    type: COMMENT_CREATE_ITEM,
    postId
  }
}
export function CommentCreateItem(payload) {
  return {
    type: COMMENT_CREATE_ITEM,
    payload
  }
}

export function CommentUpdateItem(id) {
  return {
    type: COMMENT_UPDATE_ITEM,
    id
  }
}

export function CommentRemoveItem(id) {
  return {
    type: COMMENT_REMOVE_ITEM,
    id
  }
}
