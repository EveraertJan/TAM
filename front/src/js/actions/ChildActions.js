import {
  CHILD_CREATE_ITEM,
  CHILD_CREATE_INFO,
  CHILD_CREATE_ADMIN,
  CHILD_LIST_ADMINS
} from './../constants/ChildConstants'

export function ChildCreateItem(payload) {
  return {
    type: CHILD_CREATE_ITEM,
    payload
  }
}
export function ChildCreateInfo(id, payload) {
  return {
    type: CHILD_CREATE_INFO,
    id,
    payload
  }
}
export function ChildListAdmins(id) {
  return {
    type: CHILD_LIST_ADMINS,
    id
  }
}
export function ChildCreateAdmin(payload) {
  return {
    type: CHILD_CREATE_ADMIN,
    payload
  }
}

