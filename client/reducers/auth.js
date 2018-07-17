import { SET_CURRENT_USER } from '../actions/types';


const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action = {}) => {
    console.log('action')
    console.log(action)
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: action.user.username && action.user.username.length>0,
                user: action.user
            };
        default: return state;
    }
}