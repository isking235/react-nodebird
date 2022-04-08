export const initialState = {
    isLoggingIn:false, //로그인 시도중
    isLoggedIn: false,
    isLoggingOut:false, //로그아웃 시도중
    me: null,
    signUpData: {},
    loginData: {},
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';// 액션의 이름
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';// 액션의 이름

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';



export const LOG_IN = 'LOG_IN'; // 액션의 이름
export const LOG_OUT = 'LOG_OUT';

export const signUpAction = (data) => {
    return {
        type: SIGN_UP,
        data,
    };
};

export const signUpSuccess = {
    type: SIGN_UP_SUCCESS,
};

export const loginAction = (data) => {
    return {
        type: LOG_IN,
        data,
    }
};
export const logoutAction = {
    type: LOG_OUT,
};
export const signUp = (data) => {
    return {
        type: SIGN_UP,
        data,
    }
};

const dummyUser = (data) => ({
    ...data,
    nickname: '제로초',
    id: 1,
    Posts: [{ id: 1 }],
    Followings: [{ nickname: '부기초' }, { nickname: 'Chanho Lee' }, { nickname: 'neue zeal' }],
    Followers: [{ nickname: '부기초' }, { nickname: 'Chanho Lee' }, { nickname: 'neue zeal' }],
});

export const loginRequestAction = (data) => ({
    type: LOG_IN_REQUEST,
    data,
});

export const logoutRequestAction = () => ({
    type: LOG_OUT_REQUEST,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST: {
            console.log('reducer logIn');
            return {
                ...state,
                isLoggingIn: true,
            };
        }
        case LOG_IN_SUCCESS: {
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                me:{...action.data, nickname:'isking235'}
            };
        }
        case LOG_IN_FAILURE: {
            return {
                ...state,
                isLoggedIn: false,
                isLoggingIn: false,
            };
        }

        case LOG_OUT_REQUEST: {
            return {
                ...state,
                isLoggingOut: true
            };
        }
        case LOG_OUT_SUCCESS: {
            return {
                ...state,
                isLoggingOut: false,
                isLoggedIn: false,
                me: null,
            };
        }
        case LOG_OUT_FAILURE: {
            return {
                ...state,
                isLoggingOut: false,
            };
        }

        /*case SIGN_UP: {
            return {
                ...state,
                signUpData: action.data,
            };
        }*/
        default: {
            return {
                ...state,
            }
        }
    }
};

export default reducer;