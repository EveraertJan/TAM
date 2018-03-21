import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import {
  POST_CREATE_ITEM,
  POST_CREATE_ITEM_SUCCESS,
  POST_CREATE_ITEM_FAILED,

  POST_CREATE_ITEM_PART,
  POST_CREATE_ITEM_PART_SUCCESS,
  POST_CREATE_ITEM_PART_FAILED,

  POST_FETCH_LIST,
  POST_FETCH_LIST_SUCCESS,
  POST_FETCH_LIST_FAILED,

  POST_FETCH_DETAIL,
  POST_FETCH_DETAIL_SUCCESS,
  POST_FETCH_DETAIL_FAILED
} from './../constants/PostConstants'

function* postFetchList(action) {
   try {
    let URL = `http://localhost:3000/post`;
    if(action.userId) {
      URL = `http://localhost:3000/post/user/${action.userId}`;
    }
      
      const result = yield axios({
        method: 'get',
        url: URL,
        headers: {
          Authorization: `bearer: ${getCookie('jwt')}`
        }
      })
      //const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: POST_FETCH_LIST_SUCCESS, data: result.data});
   } catch (e) {
      yield put({type: POST_FETCH_LIST_FAILED, message: e.message});
   }
}
function* postFetchDetail(action) {
   try {
      const result = yield axios({
        method: 'get',
        url: `http://localhost:3000/post/${action.id}`,
        headers: {
          Authorization: `bearer: ${getCookie('jwt')}`
        }
      })
      //const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: POST_FETCH_DETAIL_SUCCESS, data: result.data});
   } catch (e) {
      yield put({type: POST_FETCH_DETAIL_FAILED, message: e.message});
   }
}

function* postCreateItem(action) {
   try {
      const result = yield axios({
        method: 'post',
        url: `http://localhost:3000/post/`,
        data: action.payload,
        headers: {
          Authorization: `bearer: ${getCookie('jwt')}`
        }
      })
      //const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: POST_CREATE_ITEM_SUCCESS, data: result.data});
   } catch (e) {
      yield put({type: POST_CREATE_ITEM_FAILED, message: e.message});
   }
}

function* postCreateItemPart(action) {
   try {
      const result = yield axios({
        method: 'post',
        url: `http://localhost:3000/post/${action.payload.post_id}`,
        data: action.payload,
        headers: {
          Authorization: `bearer: ${getCookie('jwt')}`
        }
      })
      //const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: POST_CREATE_ITEM_PART_SUCCESS, data: result.data});
   } catch (e) {
      yield put({type: POST_CREATE_ITEM_PART_FAILED, message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* postSagas() {
  yield takeEvery(POST_FETCH_LIST, postFetchList);
  yield takeEvery(POST_FETCH_DETAIL, postFetchDetail);
  yield takeEvery(POST_CREATE_ITEM, postCreateItem);
  yield takeEvery(POST_CREATE_ITEM_PART, postCreateItemPart);
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

export default postSagas;