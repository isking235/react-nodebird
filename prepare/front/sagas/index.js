import {all, fork} from 'redux-saga/effects';
import postSaga from "./post";
import userSaga from "./user";


//2.이벤트를 등록 한다.
export default function* rootSaga() {
    yield  all([
        fork(postSaga),
        fork(userSaga),
    ])
}