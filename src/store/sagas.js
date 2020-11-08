import { all } from 'redux-saga/effects';

//public
import AccountSaga from './auth/register/saga';
import AuthSaga from './auth/login/saga';
import ProfileSaga from './auth/profile/saga';
import LayoutSaga from './layout/saga';
import ProductSaga from "./product/saga"
import ProdutosListaSaga from "./listaProdutos/saga"


export default function* rootSaga() {
    yield all([
        //public
        AccountSaga(),
        AuthSaga(),
        ProfileSaga(),
        //ForgetSaga(),
        LayoutSaga(),
        ProductSaga(),
        ProdutosListaSaga()
    ])
}