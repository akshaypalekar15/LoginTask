import {
    FETCH_LOGIN,
    LOGOUT
} from '../actions/types'


const initialState = {
    username: '',
    password: '',
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LOGIN:
            return {
                ...state,
                username: action.username,
                password: action.password
            };
        case LOGOUT:
            return {
                ...state,
                username: '',
                password: ''
            };
        default:
            return { ...state };
    }
}

export default rootReducer;