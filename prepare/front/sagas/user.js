import {all, delay, fork, put, takeLatest, call} from "redux-saga/effects";
import axios from "axios";
import {
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    SIGN_UP_SUCCESS,
    SIGN_UP_REQUEST,
    SIGN_UP_FAILURE,
    FOLLOW_REQUEST,
    UNFOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    FOLLOW_FAILURE,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAILURE
} from "../reducers/user";

/*이패턴을 복사하여 action을 만든다.*******************************************/
//4. logIn() 에서 call 로 실행 한다.(비동기)
function  loginAPI(data) { //*이 들어 가지 않는다.
    return axios.post('/user/login', data);
}
//3. LOG_IN_REQUEST 실행되면 login() 가 실행된다.
function* logIn(action) { //매개변수가 들어옴
    try{
        const result = yield call(loginAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data : result.data,
        });
    } catch (err) {
        yield put({ //put은 dispatch 다
            type: LOG_IN_FAILURE,
            error: err.response.data,
        });
    }
}
/*******************************************/
function  logOutAPI() { //*이 들어 가지 않는다.
    return axios.post('/user/logout');
}
function* logOut() {
    try{
        //const result = yield call(logOutAPI)
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS
        });
    } catch (err) {
        yield put({ //put은 dispatch 다
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        });
    }
}

/*******************************************/
function  signUpAPI(data) { //*이 들어 가지 않는다.
    return axios.post('/user',data);
}
function* signUp(action) {
    try{
        const result = yield call(signUpAPI, action.data);
        console.log(result);
        yield put({
            type: SIGN_UP_SUCCESS
        });
    } catch (err) {
        yield put({ //put은 dispatch 다
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
}

/*******************************************/
function  followAPI() { //*이 들어 가지 않는다.
    return axios.post('/api/follow');
}
function* follow(action) {
    try{
        //const result = yield call(signUpAPI)
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data : action.data,
        });
    } catch (err) {
        yield put({ //put은 dispatch 다
            type: FOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}

/*******************************************/
function  unfollowAPI() { //*이 들어 가지 않는다.
    return axios.post('/api/unfollow');
}
function* unfollow(action) {
    try{
        //const result = yield call(signUpAPI)
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data : action.data,
        });
    } catch (err) {
        yield put({ //put은 dispatch 다
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}

//1. 이벤트 리스너 역할을 한다.
function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all([
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),



    ])
}