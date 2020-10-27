import { LOGIN_USER, LOGIN_SUCCESS, LOGOUT_USER, LOGOUT_USER_SUCCESS, API_ERROR, MODAL_PASSWORD, MODAL_PASSWORD_REQUESTED } from './actionTypes';

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

export const modalChangePassword = (value) => {
    console.log("value")
    return {
        type: MODAL_PASSWORD,
        payload: value
    }
}

export const modalChangePasswordInit = (value) => {
    console.log("modalChangePasswordInit")
    return {
        type: MODAL_PASSWORD_REQUESTED,
        payload: value
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

export const apiError = (error) => {
    return {
        type: API_ERROR,
        payload: error
    }
}
