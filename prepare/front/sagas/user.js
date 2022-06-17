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
    LOAD_MY_INFO_SUCCESS,
    LOAD_MY_INFO_FAILURE,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWINGS_SUCCESS,
    LOAD_FOLLOWINGS_FAILURE,
    REMOVE_FOLLOWER_REQUEST,
    REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE
} from "../reducers/user";

/*******************************************************************/
function  removeFollowerAPI(data) { //*이 들어 가지 않는다.
    return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action) { //매개변수가 들어옴
    try{
        const result = yield call(removeFollowerAPI, action.data);
        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data : result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({ //put은 dispatch 다
            type: REMOVE_FOLLOWER_FAILURE,
            error: err.response.data,
        });
    }
}

/*******************************************************************/
function  loadFollowersAPI(data) { //*이 들어 가지 않는다.
    return axios.get('/user/followers', data);
}

function* loadFollowers(action) { //매개변수가 들어옴
    try{
        const result = yield call(loadFollowersAPI, action.data);
        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data : result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({ //put은 dispatch 다
            type: LOAD_FOLLOWERS_FAILURE,
            error: err.response.data,
        });
    }
}

/*******************************************************************/
function  loadFollowingsAPI(data) { //*이 들어 가지 않는다.
    return axios.get('/user/followings', data);
}

function* loadFollowings(action) { //매개변수가 들어옴
    try{
        const result = yield call(loadFollowingsAPI, action.data);
        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data : result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({ //put은 dispatch 다
            type: LOAD_FOLLOWINGS_FAILURE,
            error: err.response.data,
        });
    }
}

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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
        yield put({ //put은 dispatch 다
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
}

/*******************************************/
function  followAPI(data) { //*이 들어 가지 않는다.
    return axios.patch(`/user/${data}/follow`);
}
function* follow(action) {
    try{
        const result = yield call(followAPI, action.data);
        yield put({
            type: FOLLOW_SUCCESS,
            data : result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({ //put은 dispatch 다
            type: FOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}

/*******************************************/
function  unfollowAPI(data) { //*이 들어 가지 않는다.
    return axios.delete(`/user/${data}/follow`);
}
function* unfollow(action) {
    try{
        const result = yield call(unfollowAPI, action.data);
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data : result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({ //put은 dispatch 다
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}

//1. 이벤트 리스너 역할을 한다.

function* watchRemoveFollower() {
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* watchLoadFollowers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
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
        fork(watchRemoveFollower),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
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