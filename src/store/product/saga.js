import { takeLatest, fork, put, all, call } from 'redux-saga/effects';
import { API, graphqlOperation} from "aws-amplify"
import * as mutations from "../../graphql/mutations"
import * as queries from "../../graphql/queries"
import {saveNewProduct, saveNewProductSuccess, saveNewProductfailed} from "./actions"
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
            console.log(data)
            return resolve(data)
        } )
        .catch( err => reject( _handleError(err)) )
    })
}

function trySalveNewProduct (values)  {
    const input = {
        nome: values.nome,
        categoria: values.categoria,
        fabricante: values.fabricante,
        descricao: values.descricao,
        anexos: values.anexos,
        imagens: values.imagens,
    }
    return new Promise((resolve, reject)=> {
        API.graphql(graphqlOperation( mutations.createProduto, {input} ))
        .then( (data) => {

            return resolve(data.createProduto)
        } )
        .catch( err => reject( _handleError(err)) )
    })


}


function* saveProduct(action){
    try{
        const product = yield call(trySalveNewProduct, action.payload)
        const products = yield call(trygetProducts, action.payload)
        console.log("asdfas", products)
        yield put(saveNewProductSuccess(product))
    } catch(err){
        console.log("err", err)
        yield put(saveNewProductfailed(err))
    }
}

function* saveProductWatcher(){
    yield takeLatest( types.CREATE_PRODUCT_REQUESTED, saveProduct )
}

function* productSaga(){
    yield all([
        fork(saveProductWatcher),
    ]);
}

export default productSaga
