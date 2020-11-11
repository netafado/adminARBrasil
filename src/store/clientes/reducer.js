import * as types from "./types"

const inicialState = {
    clientes: [],
    loading: false,
    error: "",
    newCliente: null,
    deleteCliente: null,
    nextToken: "",
    oneCliente: null,
}


const clientes = function(state = inicialState, action) {
    switch (action.type) {
        case types.LIST_CLIENTE_REQUESTED:
            return {...state, loading: true}
        case types.LIST_CLIENTE_SUCCESS:
            console.log(action)
            return {...state, loading: false, clientes: action.payload.items, nextToken: action.payload.nextToken}
        case types.LIST_CLIENTE_FAILED:
            return {...state, loading: false, error: action.payload}
        //criar
        case types.ADD_CLIENTE_REQUESTED:
            return {...state, loading: true}
        case types.ADD_CLIENTE_SUCCESS:
            return {...state, loading: false, newCliente: action.payload}
        // delete produto
        case types.DELETE_CLIENTE_REQUESTED:
            return {...state, loading: true}
        case types.DELETE_CLIENTE_SUCCESS:
            return {...state, loading: false, deleteCliente: action.payload}
        default:
            return state

    }
}

export default clientes