import { takeLatest, fork, put, all, call } from 'redux-saga/effects';
import { API, graphqlOperation, } from "aws-amplify"
import * as mutations from "../../graphql/mutations"
import * as queries from "../../graphql/queries"
import {getCliente, getClienteSucess, getClienteFailed} from "./actions"
import * as types from "./types"

const  _handleError =(error) => {
    console.log(error)
    var errorMessage = error.message;
    return errorMessage;
}

function getClienteFromAPI(pk){
    return new Promise((resolve, reject)=> {
        API.graphql(graphqlOperation( queries.retornarCliente, {pk}))
        .then( (result) => {
            resolve(result.data.retornarCliente)
        } )
        .catch( err => reject( _handleError(err)) )
    })
}
function* carregarCliente(action){
    console.log("carregarCliente")
    try{
        const cliente = yield call(getClienteFromAPI, action.payload)
        console.log(cliente)
        yield put(getClienteSucess(cliente))
    } catch(err){
        console.log(err)
        yield put(getClienteFailed(err))
    }
}


function* getClienteWatcher(){
    yield takeLatest( types.GET_CLIENTE, carregarCliente )
}

function* pegarClienteSaga(){
    yield all([
        fork(getClienteWatcher),
    ]);
}

export default pegarClienteSaga
