import {
	POST_CREATE_ITEM,
  POST_CREATE_ITEM_PART,
	POST_FETCH_LIST,
	POST_FETCH_DETAIL,
	POST_UPDATE_ITEM,
	POST_REMOVE_ITEM
} from './../constants/PostConstants'

export function PostFetchList(userId = null) {
  return {
    type: POST_FETCH_LIST,
    userId
  }
}
export function PostFetchDetail(id) {
  return {
    type: POST_FETCH_DETAIL,
    id
  }
}

export function PostCreateItem(payload) {
  return {
    type: POST_CREATE_ITEM,
    payload
  }
}

export function PostCreateItemPart(payload) {
  return {
    type: POST_CREATE_ITEM_PART,
    payload
  }
}

export function PostUpdateItem(id) {
  return {
    type: POST_UPDATE_ITEM,
    id
  }
}

export function PostRemoveItem(id) {
  return {
    type: POST_REMOVE_ITEM,
    id
  }
}
