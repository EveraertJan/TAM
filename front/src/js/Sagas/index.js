import { fork } from 'redux-saga/effects';
import PostSagas from './PostSagas';

export default function* rootSaga() {
    yield [
        fork(PostSagas)
    ];
}