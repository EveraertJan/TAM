import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import {
  FILE_UPLOAD_IMAGE,
  FILE_UPLOAD_IMAGE_SUCCESS,
  FILE_UPLOAD_IMAGE_FAILED,

} from './../constants/FileConstants.js'

function* uploadImage(action) {
   try {

      const result = yield axios({
        method: 'post',
        url: `http://localhost:3000/file/upload`,
        data: action.payload,
        headers: {
          Authorization: `bearer: ${getCookie('jwt')}`
        }
      })

      //const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: FILE_UPLOAD_IMAGE_SUCCESS, data: result.data});
   } catch (e) {
      yield put({type: FILE_UPLOAD_IMAGE_FAILED, message: e.message});
   }
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* fileSagas() {
  yield takeEvery(FILE_UPLOAD_IMAGE, uploadImage);
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
export default fileSagas;

