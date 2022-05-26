import axios from "axios";
import {all, fork, put, takeLatest, delay,throttle,call} from 'redux-saga/effects';
import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_FAILURE,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    LOAD_POSTS_FAILURE,
    LIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,
    UNLIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
} from "../reducers/post";
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user";

/*******************************************/
function  uploadImagesAPI(data) { //*이 들어 가지 않는다.
    return axios.post(`/post/images`, data);
}
function* uploadImages(action) {
    try{
        const result = yield call(uploadImagesAPI, action.data)
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({ //put은 dispatch 다
            type: UPLOAD_IMAGES_FAILURE,
            data: err.response.data,
        });
    }
}

/*******************************************/
function  likePostAPI(data) { //*이 들어 가지 않는다.
    return axios.patch(`/post/${data}/like`, data);
}
function* likePost(action) {
    try{
        const result = yield call(likePostAPI, action.data)
        yield put({
            type: LIKE_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({ //put은 dispatch 다
            type: LIKE_POST_FAILURE,
            data: err.response.data,
        });
    }
}
/*******************************************/
function  unlikePostAPI(data) { //*이 들어 가지 않는다.
    return axios.delete(`/post/${data}/like`, data);
}
function* unlikePost(action) {
    try{
        const result = yield call(unlikePostAPI, action.data)
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({ //put은 dispatch 다
            type: UNLIKE_POST_FAILURE,
            data: err.response.data,
        });
    }
}
/*******************************************/
function  loadPostsAPI(data) { //*이 들어 가지 않는다.
    return axios.get('/posts', data);
}
function* loadPosts(action) {
    try{
        const result = yield call(loadPostsAPI, action.data)
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({ //put은 dispatch 다
            type: LOAD_POSTS_FAILURE,
            data: err.response.data,
        });
    }
}

/*******************************************/
function  addPostAPI(data) { //*이 들어 가지 않는다.
    return axios.post('/post', data);
}
function* addPost(action) {
    try{
        const result = yield call(addPostAPI, action.data);

        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
        //POST에서 User 의  post를 더해 준다. post action 에서 user를 변경
        yield put({
            type : ADD_POST_TO_ME,
            data : result.data.id,
        })
    } catch (err) {
        yield put({ //put은 dispatch 다
            type: ADD_POST_FAILURE,
            data: err.response.data,
        });
    }
}

/*******************************************/
function  removePostAPI(data) { //*이 들어 가지 않는다.
    return axios.delete(`/post/${data}`);
}
function* removePost(action) {
    try{
        const result = yield call(removePostAPI, action.data)
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: result.data,
        });
        //POST에서 User 의  post를 더해 준다. post action 에서 user를 변경
        yield put({
            type : REMOVE_POST_OF_ME,
            data : action.data,
        })
    } catch (err) {
        console.error(err);
        yield put({ //put은 dispatch 다
            type: REMOVE_POST_FAILURE,
            data: err.response.data,
        });
    }
}

/*******************************************/
function  addCommentAPI(data) { //*이 들어 가지 않는다.
    return axios.post(`/post/${data.postId}/comment`, data); //POST /post/1/comment
}
function* addComment(action) {
    try{
        const result = yield call(addCommentAPI, action.data)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({ //put은 dispatch 다
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function* watchLoadPosts() {
    yield throttle(5000,LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}


export default function* postSaga() {
    yield all([
        fork(watchUploadImages),
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchAddPost),
        fork(watchLoadPosts),
        fork(watchRemovePost),
        fork(watchAddComment),
    ])
}