import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SET_USER_REQUESTED } from './actionTypes';
import { loginSuccess, logoutUserSuccess, apiError, setUserSucess } from './actions';

//Include Both Helper File with needed methods
import { getFirebaseBackend } from '../../../helpers/firebase_helper';

const cognitoUtils = getFirebaseBackend();

function*  loginUser({ payload: { user, history } }) {
    try {
        const response = yield call(cognitoUtils.loginUser, user.email, user.password);
        yield put(loginSuccess(response));
        if(response.challengeName === "NEW_PASSWORD_REQUIRED"){
            history.push('/alter-password');
            return
        }

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
        const response = yield call(cognitoUtils.logout);
        yield put(logoutUserSuccess(response));
        history.push('/login');
    } catch (error) {
        yield put(apiError(error));
    }
}

function* setUser ({ payload }){
    yield put (setUserSucess(payload))
} 

export function* watchUserLogin() {
    yield takeEvery(LOGIN_USER, loginUser)
}

export function* watchUserLogout() {
    yield takeEvery(LOGOUT_USER, logoutUser)
}

export function* watchUserSetUser() {
    yield takeEvery(SET_USER_REQUESTED, setUser)
}


function* authSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserLogout),
        fork(watchUserSetUser),
    ]);
}

export default authSaga;