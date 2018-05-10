import {
  USER_LOGIN,
  USER_REGISTER,
  REQUEST_RECOVERY,
  USER_FETCH_DETAIL,
  VERIFY_USER_TOKEN,
  USER_EDIT_ITEM
} from './../constants/UserConstants'

export function loginAction(data) {
  return {
    type: USER_LOGIN,
    data
  }
}
export function verifyUserToken(token) {
  return {
    type: VERIFY_USER_TOKEN,
    token
  }
}
export function registerUserAction(payload) {
  return {
    type: USER_REGISTER,
    payload
  }
}

export function requestRecoveryAction(id) {
  return {
    type: REQUEST_RECOVERY,
    id
  }
}

export function userFetchDetailAction(id) {
  return {
    type: USER_FETCH_DETAIL,
    id
  }
}

export function userEditItem(payload) {
  return {
    type: USER_EDIT_ITEM,
    payload
  }
}

