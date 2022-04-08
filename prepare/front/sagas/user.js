import {all, call, delay, fork, put, takeLatest} from "redux-saga/effects";
import axios from "axios";

/*이패턴을 복사하여 action을 만든다.*******************************************/
//4. logIn() 에서 call 로 실행 한다.(비동기)
function  loginAPI(data) { //*이 들어 가지 않는다.
    return axios.post('/api/login', data)
}
//3. LOG_IN_REQUEST 실행되면 login() 가 실행된다.
function* logIn(action) { //매개변수가 들어옴
    try{
        console.log('saga logIn');
        //const result = yield call(loginAPI, action.data);
        yield delay(1000);
        yield put({
            type: 'LOG_IN_SUCCESS',
            data : action.data,
        });
    } catch (err) {
        yield put({ //put은 dispatch 다
            type: 'LOG_IN_FAILURE',
            data: err.response.data,
        });
    }
}
/*******************************************/
function  logOutAPI() { //*이 들어 가지 않는다.
    return axios.post('/api/logout');
}
function* logOut() {
    try{
        const result = yield call(logOutAPI)
        yield put({
            type: 'LOG_OUT_SUCCESS'
        });
    } catch (err) {
        yield put({ //put은 dispatch 다
            type: 'LOG_OUT_FAILURE',
            data: err.response.data,
        });
    }
}

//1. 이벤트 리스너 역할을 한다.
function* watchLogIn() {
    yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST', logOut);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut)


    ])
}