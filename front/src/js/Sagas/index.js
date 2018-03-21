import { fork } from 'redux-saga/effects';
import PostSagas from './PostSagas';
import UserSagas from './UserSagas';
import ChildSagas from './ChildSagas';
import FileSagas from './FileSagas'

export default function* rootSaga() {
    yield [
        fork(PostSagas),
        fork(UserSagas),
        fork(ChildSagas),
        fork(FileSagas)
    ];
}
