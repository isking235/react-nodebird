const initialState = {
    user: {
        isLoggedIn:false,
        user : null,
        signUpData:{},
        loginData : {},
    },
    post: {
        mainPosts:[],
    }
};

export const loginAction = (data) => {
    return {
        type:'LOG_IN',
        data,
    }
}

export const logoutAction = (data) => {
    return {
        type:'LOG_OUT',
    }
}




//action creater
const changeNickname = (data) => {
    return {
        type : 'CHANGE_NICKNAME',
        data,
    }
};

//changeNickne('nenu zeal'); //아래와 동일
/*{
    type: 'CHANGE_NICKNAME',
    data: 'nenu zeal';
}*/
//store.dispatch(changeNickname('mighty tak'))

//(이전상태, 액션) => 다음상태
const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                user : {
                    ...state.user,
                    isLoggedIn: true,
                    user : action.data,
                },
            };
        case 'LOG_OUT':
            return {
                ...state,
                user : {
                    ...state.user,
                    isLoggedIn: false,
                    user : null,
                },
            };
    }
};

export default rootReducer;