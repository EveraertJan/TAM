import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  VERIFY_USER_TOKEN,
  VERIFY_USER_TOKEN_SUCCESS,
  VERIFY_USER_TOKEN_FAILED,
  USER_FETCH_DETAIL,
  USER_FETCH_DETAIL_SUCCESS,
  USER_FETCH_DETAIL_FAILED,

  USER_EDIT_ITEM,
  USER_EDIT_ITEM_SUCCESS,
  USER_EDIT_ITEM_FAILED
} from './../constants/UserConstants.js'

function* userLogin(action) {
   try {
      const result = yield axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/login`,
        data: action.payload
      })
      //const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: USER_LOGIN_SUCCESS, data: result.data});
   } catch (e) {
      yield put({type: USER_LOGIN_FAILED, message: e.message});
   }
}
function* userRegister(action) {
   try {
      const result = yield axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/register`,
        data: action.payload
      })
      //const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: USER_REGISTER_SUCCESS, data: result.data});
   } catch (e) {
      yield put({type: USER_REGISTER_FAILED, message: e.message});
   }
}
function* verifyToken(action) {
   try {
      const result = yield axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/verifyToken`,
        headers: {
          'Authorization': 'bearer: ' + action.token
        }
      })
      //const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: VERIFY_USER_TOKEN_SUCCESS, data: result.data});
   } catch (e) {
      yield put({type: VERIFY_USER_TOKEN_FAILED, message: e.message});
   }
}
function* fetchUser(action) {
   try {
      const result = yield axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/user/${action.id}`,
        headers: {
          'Authorization': 'bearer: ' + getCookie('jwt')
        }
      })
      //const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: USER_FETCH_DETAIL_SUCCESS, data: result.data});
   } catch (e) {
      yield put({type: USER_FETCH_DETAIL_FAILED, message: e.message});
   }
}

function* editUser(action) {
   try {
      const result = yield axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/user`,
        data: action.payload,
        headers: {
          'Authorization': 'bearer: ' + getCookie('jwt')
        }
      })
      //const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: USER_EDIT_ITEM_SUCCESS, data: result.data});
   } catch (e) {
      yield put({type: USER_EDIT_ITEM_FAILED, message: e.message});
   }
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* userSagas() {
  yield takeEvery(USER_LOGIN, userLogin);
  yield takeEvery(USER_REGISTER, userRegister);
  yield takeEvery(VERIFY_USER_TOKEN, verifyToken);
  yield takeEvery(USER_FETCH_DETAIL, fetchUser);
  yield takeEvery(USER_EDIT_ITEM, editUser);
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

export default userSagas;