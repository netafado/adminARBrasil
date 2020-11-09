import { takeLatest, fork, put, all, call } from 'redux-saga/effects';
import { API, graphqlOperation, } from "aws-amplify"
import * as mutations from "../../graphql/mutations"
import * as queries from "../../graphql/queries"
import {listarProdutosSucesso, listaProdutosFalhou, saveNewCliente, saveNewClienteSuccess, saveNewClientefailed} from "./actions"
import * as types from "./types"

const  _handleError =(error) => {
    console.log(error)
    var errorMessage = error.message;
    return errorMessage;
}

function getClientesFromAPI(){
    return new Promise((resolve, reject)=> {
        API.graphql(graphqlOperation( queries.listarCliente))
        .then( (data) => {
            return resolve(data.listarCliente)
        } )
        .catch( err => reject( _handleError(err)) )
    })
}
function* carregarCliente(action){
    try{
        const products = yield call(getClientesFromAPI, action.payload)
        yield put(listarProdutosSucesso(products))
    } catch(err){
        console.log("err", err)
        yield put(listaProdutosFalhou(err))
    }
}

function newClienteFromAPI ({values})  {
    const input = {
        razaoSocial: values.razaoSocial,
        cnpj: values.cnpj,
        telefone: values.telefone,
        email: values.email,
        cep: values.cep,
        rua: values.rua,
        bairro: values.bairro,
        cidade: values.cidade,
        uf: values.uf,
        logo: values.logo,
    }
    return new Promise((resolve, reject)=> {
        API.graphql(graphqlOperation( mutations.createCliente, {input} ))
        .then( (data) => {
            console.log(data)
            return resolve(data.createProduto)
        } )
        .catch( err => reject( _handleError(err)) )
    })
}

function* addNewCliente(action){
    try{
        const cliente = yield call(newClienteFromAPI, action.payload)
        yield put(saveNewClienteSuccess(cliente))
        action.payload.history.push("/clientes")
    } catch(err){
        console.log("addNewCliente", err)
        yield put(saveNewClientefailed(err))
    }
}

function* listarClienteWatcher(){
    yield takeLatest( types.LIST_CLIENTE_REQUESTED, carregarCliente )
}

function* addNewClienteWatcher(){
    yield takeLatest( types.ADD_CLIENTE_REQUESTED, addNewCliente )
}

function* listarClienteSaga(){
    yield all([
        fork(listarClienteWatcher),
        fork(addNewClienteWatcher)
    ]);
}

export default listarClienteSaga
