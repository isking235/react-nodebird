import axios from "axios";
import {all, fork, put, takeLatest, delay} from 'redux-saga/effects';


/*******************************************/
function  addPostAPI(data) { //*이 들어 가지 않는다.
    return axios.post('/api/logout', data);
}
function* addPost(action) {
    try{
        //const result = yield call(addPostAPI, action.data)
        yield delay(1000);
        yield put({
            type: 'ADD_POST_SUCCESS'
        });
    } catch (err) {
        yield put({ //put은 dispatch 다
            type: 'ADD_POST_FAILURE',
            data: err.response.data,
        });
    }
}

function* watchAddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost);
}



export default function* postSaga() {
    yield all([
        fork(watchAddPost),
    ])
}