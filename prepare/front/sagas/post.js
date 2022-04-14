import axios from "axios";
import {all, fork, put, takeLatest, delay} from 'redux-saga/effects';
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_SUCCESS, ADD_COMMENT_REQUEST, ADD_COMMENT_FAILURE,
} from "../reducers/post";


/*******************************************/
function  addPostAPI(data) { //*이 들어 가지 않는다.
    return axios.post('/api/logout', data);
}
function* addPost(action) {
    try{
        //const result = yield call(addPostAPI, action.data)
        yield delay(1000);
        yield put({
            type: ADD_POST_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({ //put은 dispatch 다
            type: ADD_POST_FAILURE,
            data: err.response.data,
        });
    }
}

/*******************************************/
function  addCommentAPI(data) { //*이 들어 가지 않는다.
    return axios.post('/api/post/${data.postId}/comment', data);
}
function* addComment(action) {
    try{
        //const result = yield call(addCommentAPI, action.data)
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({ //put은 dispatch 다
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}


export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ])
}