import { takeLatest, fork, put, all, call } from 'redux-saga/effects';
import { API, graphqlOperation, a} from "aws-amplify"
import * as mutations from "../../graphql/mutations"
import {saveNewProductSuccess, saveNewProductfailed, deleteProdutctSucess, updateProductSucess} from "./actions"
import * as types from "./types"

const  _handleError =(error) => {
    var errorMessage = error.message;
    return errorMessage;
}


function deleteProdut(pk){
    return new Promise((resolve, reject)=> {
        API.graphql(graphqlOperation( mutations.deleteProduto, {pk}))
        .then( (data) => {
            console.log(data)
            return resolve(data)
        } )
        .catch( err => reject( _handleError(err)) )
    })
}


function trySalveNewProduct ({values})  {
    const input = {
        nome: values.nome,
        categoria: values.categoria,
        fabricante: values.fabricante,
        informacaoAdicional: values.informacaoAdicional,
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
        yield put(saveNewProductSuccess(product))
        action.payload.history.push("/produtos")
    } catch(err){
        console.log("err", err)
        yield put(saveNewProductfailed(err))
    }
}

function* deletarProduto(action){
    try {
        const productDeleted = yield call(deleteProdut, action.payload)
        yield put(deleteProdutctSucess(productDeleted))
    } catch (error) {
        console.log(error)
    }
}

function updateProductAPI({values}){
    const input = {
        pk: values.pk,
        nome: values.nome,
        categoria: values.categoria,
        fabricante: values.fabricante,
        descricao: values.descricao,
        informacaoAdicional: values.informacaoAdicional,
        anexos: values.anexos,
        imagens: values.imagens,
    }

    return new Promise((resolve, reject)=> {
        API.graphql(graphqlOperation( mutations.updateProduto, {input} ))
        .then( (data) => {
            return resolve(data.createProduto)
        } )
        .catch( err => reject( _handleError(err)) )
    })
}

function* updateProduto(action){
    try{
        const product = yield call(updateProductAPI, action.payload)
        yield put(updateProductSucess(product))
        action.payload.history.push("/produtos")
    } catch(err){
        console.log("err", err)
        yield put(saveNewProductfailed(err))
    }
}

function* saveProductWatcher(){
    yield takeLatest( types.CREATE_PRODUCT_REQUESTED, saveProduct )
}
function* deleteProductWatcher(){
    yield takeLatest( types.DELETE_PRODUCT_REQUESTED, deletarProduto )
}

function* updateProductWatcher(){
    yield takeLatest( types.UPDATE_PRODUCT_REQUESTED, updateProduto )
}

function* productSaga(){
    yield all([
        fork(saveProductWatcher),
        fork(deleteProductWatcher),
        fork(updateProductWatcher)
    ]);
}

export default productSaga
