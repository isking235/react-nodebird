import {all, fork} from 'redux-saga/effects';
import axios from "axios";

import postSaga from "./post";
import userSaga from "./user";
import {backUrl} from "../config/config";

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true; // 로그인시 401이 안 뜨게 한다.
//2.이벤트를 등록 한다.
export default function* rootSaga() {
    yield  all([
        fork(postSaga),
        fork(userSaga),
    ])
}