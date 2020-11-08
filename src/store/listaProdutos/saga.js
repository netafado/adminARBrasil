import { takeLatest, fork, put, all, call } from 'redux-saga/effects';
import { API, graphqlOperation, a} from "aws-amplify"

import * as queries from "../../graphql/queries"
import {listarProdutosSucesso, listaProdutosFalhou} from "./actions"
import * as types from "./types"

const  _handleError =(error) => {
    // var errorCode = error.code;
    console.log(error)
    var errorMessage = error.message;
    return errorMessage;
}

function trygetProducts(){
    return new Promise((resolve, reject)=> {
        API.graphql(graphqlOperation( queries.listarProduto))
        .then( (data) => {
            return resolve(data)
        } )
        .catch( err => reject( _handleError(err)) )
    })
}



function* carregarProdutos(action){
    try{
        const products = yield call(trygetProducts, action.payload)
        yield put(listarProdutosSucesso(products))
    } catch(err){
        console.log("err", err)
        yield put(listaProdutosFalhou(err))
    }
}

function* listarProductWatcher(){
    yield takeLatest( types.LIST_PRODUCT_REQUESTED, carregarProdutos )
}

function* listarProdutosSaga(){
    yield all([
        fork(listarProductWatcher),
    ]);
}

export default listarProdutosSaga
