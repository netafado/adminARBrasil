import * as types from "./types"

const inicialState = {
    tecnicos: [],
    loading: false,
    error: "",
    newTecnico: null,
    deleteCliente: null,
    nextToken: "",
    oneTecnico: null,
    erroNewTecnico: null,
    updateTencino: null
}


const tecnicos = function(state = inicialState, action) {
    switch (action.type) {
        case types.LIST_TECNICO_REQUESTED:
            return {...state, loading: true}
        case types.LIST_TECNICO_SUCCESS:
            return {...state, loading: false, tecnicos: action.payload.items, nextToken: action.payload.nextToken}
        case types.LIST_TECNICO_FAILED:
            return {...state, loading: false, error: action.payload}
        //criar
        case types.ADD_TECNICO_REQUESTED:
            return {...state, loading: true}
        case types.ADD_TECNICO_SUCCESS:
            return {...state, loading: false, newTecnico: action.payload}
        case types.ADD_TECNICO_FAILED:
            return {...state, loading: false, erroNewTecnico: action.payload}
        case types.UPDATE_TECNICO_REQUESTED:
            return {...state, loading: false}
        case types.UPDATE_TECNICO_SUCCESS:
        return {...state, loading: false, updateTencino: action.payload}
        case types.CLEAR_TECNICO_FIELDS:
            return {...state, error: ""}
        default:
            return state

    }
}

export default tecnicos