import * as types from "./types"

const inicialState = {
    tecnicos: [],
    loading: false,
    error: "",
    newTecnico: null,
    deleteCliente: null,
    nextToken: "",
    oneTecnico: null,
}


const tecnicos = function(state = inicialState, action) {
    switch (action.type) {
        case types.LIST_TECNICO_REQUESTED:
            return {...state, loading: true}
        case types.LIST_TECNICO_SUCCESS:
            console.log(action)
            return {...state, loading: false, tecnicos: action.payload.items, nextToken: action.payload.nextToken}
        case types.LIST_TECNICO_FAILED:
            return {...state, loading: false, error: action.payload}
        //criar
        case types.ADD_TECNICO_REQUESTED:
            return {...state, loading: true}
        case types.ADD_TECNICO_SUCCESS:
            return {...state, loading: false, newTecnico: action.payload}
        default:
            return state

    }
}

export default tecnicos