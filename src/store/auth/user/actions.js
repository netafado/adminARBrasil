import { LOGIN_USER, LOGIN_SUCCESS, LOGOUT_USER, LOGOUT_USER_SUCCESS, API_ERROR, SET_USER_REQUESTED, SET_USER_SUCCESS } from './actionTypes';

export const loginUser = (user, history) => {
    return {
        type: LOGIN_USER,
        payload: { user, history }
    }
}

export const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

export const logoutUser = (history) => {
    return {
        type: LOGOUT_USER,
        payload: { history }
    }
}

export const logoutUserSuccess = () => {
    return {
        type: LOGOUT_USER_SUCCESS,
        payload: {}
    }
}

export const setUserAction = (user) => {

    return {
        type: SET_USER_REQUESTED,
        payload: user
    }
}

export const setUserSucess= (user) => {
    return {
        type: SET_USER_SUCCESS,
        payload: user
    }
}

export const apiError = (error) => {
    return {
        type: API_ERROR,
        payload: error
    }
}


