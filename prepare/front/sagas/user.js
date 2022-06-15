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
    UNFOLLOW_FAILURE,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOAD_USER_REQUEST,
    CHANGE_NICKNAME_REQUEST,
    CHANGE_NICKNAME_FAILURE,
    CHANGE_NICKNAME_SUCCESS,
    LOAD_MY_INFO_REQUEST,
    LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE
} from "../reducers/user";

/*******************************************************************/
function  changeNicknameAPI(data) { //*이 들어 가지 않는다.
    return axios.patch('/user/nickname', {nickname:data});
}

function* changeNickname(action) { //매개변수가 들어옴
    try{
        const result = yield call(changeNicknameAPI, action.data);
        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            data : result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({ //put은 dispatch 다
            type: CHANGE_NICKNAME_FAILURE,
            error: err.response.data,
        });
    }
}

/*******************************************************************/
function  loadUserAPI(data) { //*이 들어 가지 않는다.
    return axios.get(`/user/${data}`);
}

function* loadUser(action) { //매개변수가 들어옴
    try{
        const result = yield call(loadUserAPI, action.data);
        yield put({
            type: LOAD_USER_SUCCESS,
            data : result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({ //put은 dispatch 다
            type: LOAD_USER_FAILURE,
            error: err.response.data,
        });
    }
}

/*******************************************************************/
function  loadMyInfoAPI(data) { //*이 들어 가지 않는다.
    return axios.get('/user');
}

function* loadMyInfo() { //매개변수가 들어옴
    try{
        const result = yield call(loadMyInfoAPI);
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data : result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({ //put은 dispatch 다
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data,
        });
    }
}
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
        yield call(logOutAPI);
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
function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all([
        //fork(watchRemoveFollower),
        //fork(watchLoadFollowers),
        //fork(watchLoadFOLLOWINGS),
        fork(watchChangeNickname),
        fork(watchLoadUser),
        fork(watchLoadMyInfo),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),


    ]);
}