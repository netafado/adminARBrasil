import { takeLatest, fork, put, all, call } from 'redux-saga/effects';
import { API, graphqlOperation, } from "aws-amplify"
import * as mutations from "../../graphql/mutations"
import * as queries from "../../graphql/queries"
import {listarProdutosSucesso, listaProdutosFalhou, 
    saveNewClienteSuccess, saveNewClientefailed, listarClientes, deleteClienteSucess, updateClienteSucess} from "./actions"
import * as types from "./types"

const  _handleError =(error) => {
    console.log(error)
    var errorMessage = error.message;
    return errorMessage;
}

function getClientesFromAPI(){
    return new Promise((resolve, reject)=> {
        API.graphql(graphqlOperation( queries.listarCliente))
        .then( (result) => {
            resolve(result.data.listarCliente)
        } )
        .catch( err => reject( _handleError(err)) )
    })
}
function* carregarCliente(action){
    try{
        const clientes = yield call(getClientesFromAPI, action.payload)
        yield put(listarProdutosSucesso(clientes))
    } catch(err){
        yield put(listaProdutosFalhou(err))
    }
}

function deletarProdutoAPI(pk){
    console.log(pk)
    return new Promise((resolve, reject)=> {
        API.graphql(graphqlOperation( mutations.deleteCliente, {pk}))
        .then( (data) => {
            console.log(data)
            return resolve(data)
        } )
        .catch( err => reject( _handleError(err)) )
    })
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
        pk_produto: values.pk_produto,
    }
    return new Promise((resolve, reject)=> {
        API.graphql(graphqlOperation( mutations.createCliente, {input} ))
        .then( (data) => {
            return resolve(data.createProduto)
        } )
        .catch( err => reject( _handleError(err)) )
    })
}

function updateClienteFromAPI ({values})  {
    const input = {
        pk: values.pk,
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
        pk_produto: values.pk_produto,
        contrato: values.contrato
    }
    console.log("update", input, values)
    return new Promise((resolve, reject)=> {
        API.graphql(graphqlOperation( mutations.updateCliente, {input} ))
        .then( (data) => {
            return resolve(data.updateCliente)
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
        yield put(saveNewClientefailed(err))
        //action.payload.history.push("/clientes")
    }
}

function* deleteCliente(action){
    try{
        const cliente = yield call(deletarProdutoAPI, action.payload)
        yield put(deleteClienteSucess(cliente))
        yield put(listarClientes())
    } catch(err){
        console.log(err)
        yield put(saveNewClientefailed(err))
    }
}



function* updateCliente(action){
    try{
        const cliente = yield call(updateClienteFromAPI, action.payload)
        yield put(updateClienteSucess(cliente))
        if(action.payload.history)
            action.payload.history.push("/clientes")
        yield put(listarClientes())
    } catch(err){
        yield put(saveNewClientefailed(err))
    }
}

function* listarClienteWatcher(){
    yield takeLatest( types.LIST_CLIENTE_REQUESTED, carregarCliente )
}

function* addNewClienteWatcher(){
    yield takeLatest( types.ADD_CLIENTE_REQUESTED, addNewCliente )
}
function* deleteClienteWatcher(){
    yield takeLatest( types.DELETE_CLIENTE_REQUESTED, deleteCliente )
}
function* updateClienteWatcher(){
    yield takeLatest( types.UPDATE_CLIENTE_REQUESTED, updateCliente )
}


function* listarClienteSaga(){
    yield all([
        fork(listarClienteWatcher),
        fork(addNewClienteWatcher),
        fork(deleteClienteWatcher),
        fork(updateClienteWatcher)
    ]);
}

export default listarClienteSaga
