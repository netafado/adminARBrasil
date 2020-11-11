import { takeLatest, fork, put, all, call } from 'redux-saga/effects';
import { API, graphqlOperation, } from "aws-amplify"
import * as mutations from "../../graphql/mutations"
import * as queries from "../../graphql/queries"
import {listarTecnicosSucess, listarTecnicosFailed, 
        addTecnicoSucess, addTecnicoFaild, deleteTecnicoSuccess, deleteTecnicoFaild} from "./actions"
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
        tipo: "T"
    }
    console.log(input)
    return new Promise((resolve, reject)=> {
        API.graphql(graphqlOperation( mutations.createUsuario, {input} ))
        .then( (data) => {
            console.log(data)
            return resolve(data.createUsuario)
        } )
        .catch( err => reject( _handleError(err)) )
    })
}

function* addTecnico(action){
    try{
        const tecnico = yield call(newTecnicoFromAPI, action.payload)
        yield put(addTecnicoSucess(tecnico))
        action.payload.history.push("/tecnicos")
    } catch(err){
        console.log(err)
        yield put(addTecnicoFaild(err))
    }
}


function* deletarTecnico(action){
    console.log(action)
    try{
        const cliente = yield call(deletarClienteAPI, action.payload)
        yield put(deleteTecnicoSuccess(cliente))
    } catch(err){
        console.log(err)
        yield put(deleteTecnicoFaild(err))
    }
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


function* tecnicoSaga(){
    yield all([
        fork(listarTecnico),
        fork(addNewTecnicoWatcher),
        fork(deleteTecnicoWatcher),

    ]);
}

export default tecnicoSaga
