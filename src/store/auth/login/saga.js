import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, MODAL_PASSWORD_REQUESTED } from './actionTypes';
import { loginSuccess, logoutUserSuccess, apiError, modalChangePassword } from './actions';

//Include Both Helper File with needed methods
import { getFirebaseBackend } from '../../../helpers/firebase_helper';

const cognitoUtils = getFirebaseBackend();

function*  loginUser({ payload: { user, history } }) {
    try {
        const response = yield call(cognitoUtils.loginUser, user.email, user.password);
        if(response.challengeName === "NEW_PASSWORD_REQUIRED"){
            yield put(modalChangePassword(true))
            return
        }
        yield put(loginSuccess(response));
        history.push('/dashboard');
          
    } catch (error) {
        let err = error
        if(err === "User does not exist."){
            err = "Usuário não existe"
        }else if(err === "Incorrect username or password."){
            err = "Senha ou email incorreto"
        }
        yield put(apiError(err));
    }
}

function* logoutUser({ payload: { history } }) {
    try {
        //const response = yield call(fireBaseBackend.logout);
        //yield put(logoutUserSuccess(response));
        history.push('/login');
    } catch (error) {
        yield put(apiError(error));
    }
}

function trocarModal(payload){
    return payload 
}

function* changeModal({ payload }) {
    const result = yield call(trocarModal, payload)
    yield put(modalChangePassword(result));
    
}


export function* watchUserLogin() {
    yield takeEvery(LOGIN_USER, loginUser)
}

export function* watchUserLogout() {
    yield takeEvery(LOGOUT_USER, logoutUser)
}

export function* watchModal() {

    console.log("watchModal")
    yield takeEvery(MODAL_PASSWORD_REQUESTED, changeModal)
}

function* authSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserLogout),
        fork(watchModal),
    ]);
}

export default authSaga;