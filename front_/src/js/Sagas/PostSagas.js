import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

function* postFetchList(action) {
   try {
      const result = yield axios({
        method: 'get',
        url: `http://localhost:3000/post`
      })
      //const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "POST_FETCH_LIST_SUCCESS", data: result.data});
   } catch (e) {
      yield put({type: "POST_FETCH_LIST_FAILED", message: e.message});
   }
}
function* postFetchDetail(action) {
   try {
      const result = yield axios({
        method: 'get',
        url: `http://localhost:3000/post/${action.data}`
      })
      //const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "POST_FETCH_DETAIL_SUCCESS", data: result.data});
   } catch (e) {
      yield put({type: "POST_FETCH_DETAIL_FAILED", message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* postSagas() {
  yield takeEvery("POST_FETCH_LIST", postFetchList);
  yield takeEvery("POST_FETCH_DETAIL", postFetchDetail);
}

export default postSagas;