import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import {
  CHILD_CREATE_ITEM,
  CHILD_CREATE_ITEM_SUCCESS,
  CHILD_CREATE_ITEM_FAILED,

  CHILD_CREATE_INFO,
  CHILD_CREATE_INFO_SUCCESS,
  CHILD_CREATE_INFO_FAILED,

  CHILD_LIST_ADMINS,
  CHILD_LIST_ADMINS_SUCCESS,
  CHILD_LIST_ADMINS_FAILED,

  CHILD_CREATE_ADMIN,
  CHILD_CREATE_ADMIN_SUCCESS,
  CHILD_CREATE_ADMIN_FAILED
} from './../constants/ChildConstants.js'

function* createItem(action) {
   try {

      const result = yield axios({
        method: 'post',
        url: `http://localhost:3000/registerChild`,
        data: action.payload,
        headers: {
          Authorization: `bearer: ${getCookie('jwt')}`
        }
      })

      // update token
      console.error(result)
      document.cookie = `jwt=${result.data.token}`


      //const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: CHILD_CREATE_ITEM_SUCCESS, data: result.data.data});
   } catch (e) {
      yield put({type: CHILD_CREATE_ITEM_FAILED, message: e.message});
   }
}

function* createInfo(action) {
   try {
      const result = yield axios({
        method: 'put',
        url: `http://localhost:3000/userInfo`,
        data: {
          ...action.payload,
          user_id: action.id
        },
        headers: {
          Authorization: `bearer: ${getCookie('jwt')}`
        }
      })
      //const user = yield call(Api.fetchUser, action.payload.userId);
      console.error(result.data)
      yield put({type: CHILD_CREATE_INFO_SUCCESS, data: result.data});
   } catch (e) {
      yield put({type: CHILD_CREATE_INFO_FAILED, message: e.message});
   }
}

function* createAdmin(action) {
   try {
      const result = yield axios({
        method: 'post',
        url: `http://localhost:3000/relation`,
        data: action.payload,
        headers: {
          Authorization: `bearer: ${getCookie('jwt')}`
        }
      })
      yield put({type: CHILD_LIST_ADMINS, id: action.payload.child});
      yield put({type: CHILD_CREATE_ADMIN_SUCCESS, data: result.data});
   } catch (e) {
      yield put({type: CHILD_CREATE_ADMIN_FAILED, message: e.message});
   }
}
function* listAdmins(action) {
   try {
      const result = yield axios({
        method: 'get',
        url: `http://localhost:3000/relation/${action.id}`,
        headers: {
          Authorization: `bearer: ${getCookie('jwt')}`
        }
      })
      yield put({type: CHILD_LIST_ADMINS_SUCCESS, data: result.data});
   } catch (e) {
      yield put({type: CHILD_LIST_ADMINS_FAILED, message: e.message});
   }
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* childSagas() {
  yield takeEvery(CHILD_CREATE_ITEM, createItem);
  yield takeEvery(CHILD_CREATE_INFO, createInfo);
  yield takeEvery(CHILD_CREATE_ADMIN, createAdmin);
  yield takeEvery(CHILD_LIST_ADMINS, listAdmins);
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export default childSagas;

