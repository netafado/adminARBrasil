import { takeLatest, fork, put, all, call } from 'redux-saga/effects';
import { API, graphqlOperation, } from "aws-amplify"
import * as mutations from "../../graphql/mutations"
import * as queries from "../../graphql/queries"
import {listarTecnicosSucess, listarTecnicosFailed, listarTecnicos,
        addTecnicoSucess, addTecnicoFaild, deleteTecnicoSuccess, deleteTecnicoFaild, clearFieldsTecnico, updateTecnicoSucess, updateTecnicoFaild} from "./actions"
import * as types from "./types"

const  _handleError =(error) => {
    console.log(error)
    var errorMessage = error.message;
    return errorMessage;
}

function getTecnicosFromAPI(){
    return new Promise((resolve, reject)=> {
        API.graphql(graphqlOperation( queries.listarUsuario, {tipo: "T"}))
        .then( (result) => {
            resolve(result.data.listarUsuario)
        } )
        .catch( err => reject( _handleError(err)) )
    })
}
function* carregarTecnico(action){
    try{
        const tecnicos = yield call(getTecnicosFromAPI, action.payload)
        yield put(listarTecnicosSucess(tecnicos))
    } catch(err){
        yield put(listarTecnicosFailed(err))
    }
}


function deletarClienteAPI(pk){
    console.log(pk)
    return new Promise((resolve, reject)=> {
        API.graphql(graphqlOperation( mutations.deleteUsuario, {pk}))
        .then( (data) => {
            console.log(data)
            return resolve(data)
        } )
        .catch( err => reject( _handleError(err)) )
    })
}

function newTecnicoFromAPI ({values})  {

    const input = {
        nome: values.nome,
        cpf: values.cpf,
        telefone: values.telefone,
        email: values.email,
        cep: values.cep,
        rua: values.rua,
        bairro: values.bairro,
        cidade: values.cidade,
        uf: values.uf,
        foto: values.foto,
        tipo: "T",
        veiculo: values.veiculo,
        placa: values.placa,
        cor: values.cor,
        habilidades: values.habilidades,
        master: values.master,
        cargo_funcao: values.cargo
    }
    return new Promise((resolve, reject)=> {
        API.graphql(graphqlOperation( mutations.createUsuario, {input} ))
        .then( (data) => {
            return resolve(data.createUsuario)
        } )
        .catch( err => reject( err) )
    })
}

function updateTecnicoAPI ({values})  {
    const input = {
        nome: values.nome,
        cpf: values.cpf,
        telefone: values.telefone,
        email: values.email,
        cep: values.cep,
        pk: values.pk,
        rua: values.rua,
        bairro: values.bairro,
        cidade: values.cidade,
        uf: values.uf,
        pk_cliente: " ",
        foto: values.foto,
        tipo: "T",
        veiculo: values.veiculo,
        placa: values.placa,
        cor: values.cor,
        habilidades: values.habilidades,
        master: values.master,
    }
    console.log(input)
    return new Promise((resolve, reject)=> {
        API.graphql(graphqlOperation( mutations.updateUsuario, {input} ))
        .then( (data) => {
            return resolve(data.updateUsuario)
        } )
        .catch( err => reject( err) )
    })
}

function* addTecnico(action){
    try{
        const tecnico = yield call(newTecnicoFromAPI, action.payload)
        yield put(addTecnicoSucess(tecnico))
        action.payload.history.push("/tecnicos")


    } catch(err){
        if(typeof err === "object"){
            yield put(addTecnicoFaild("CPJ já cadastrado."))

        }else{
            yield put(addTecnicoFaild(err))
        }
    }
}

function* updateTecnico(action){
    try{
        const tecnico = yield call(updateTecnicoAPI, action.payload)
        yield put(updateTecnicoSucess(tecnico))
        action.payload.history.push("/tecnicos")



    } catch(err){
        console.log(err)
        if(typeof err === "object"){
            yield put(updateTecnicoFaild("CPJ já cadastrado."))

        }else{
            yield put(updateTecnicoFaild(err))
        }
    }
}


function* deletarTecnico(action){
    console.log(action)
    try{
        const cliente = yield call(deletarClienteAPI, action.payload)
        yield put(deleteTecnicoSuccess(cliente))
        yield put(listarTecnicos())
    } catch(err){
        console.log(err)
        yield put(deleteTecnicoFaild(err))
    }
}


function* clear(action){
    yield put(clearFieldsTecnico())
}

function* listarTecnico(){
    yield takeLatest( types.LIST_TECNICO_REQUESTED, carregarTecnico )
}

function* addNewTecnicoWatcher(){
    yield takeLatest( types.ADD_TECNICO_REQUESTED, addTecnico )
}

function* deleteTecnicoWatcher(){
    yield takeLatest( types.DELETE_TECNICO_REQUESTED, deletarTecnico )
}

function* updateTecnicoWatcher(){
    yield takeLatest( types.UPDATE_TECNICO_REQUESTED, updateTecnico )
}

function* limparWatcher(){
    yield takeLatest( types.CLEAR_TECNICO_FIELDS, clear )
}


function* tecnicoSaga(){
    yield all([
        fork(listarTecnico),
        fork(addNewTecnicoWatcher),
        fork(deleteTecnicoWatcher),
        fork(updateTecnicoWatcher),
        fork(limparWatcher),

    ]);
}

export default tecnicoSaga
