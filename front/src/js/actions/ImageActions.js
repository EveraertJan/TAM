import {
	IMAGE_CREATE_ITEM,
	IMAGE_LIST,
	IMAGE_UPDATE_ITEM,
	IMAGE_REMOVE_ITEM
} from './../constants/ImageConstants'

export function ImageCreateItem(payload) {
  return {
    type: IMAGE_CREATE_ITEM,
    payload
  }
}

export function ImageUpdateItem(id) {
  return {
    type: IMAGE_UPDATE_ITEM,
    id
  }
}

export function ImageRemoveItem(id) {
  return {
    type: IMAGE_REMOVE_ITEM,
    id
  }
}
