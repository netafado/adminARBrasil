import * as types from "./types"

const inicialState = {
    cliente: null,
    loading: false,
    error: "",
}


const cliente = function(state = inicialState, action) {
    switch (action.type) {
        case types.GET_CLIENTE:
            return {...state, loading: true}
        case types.GET_CLIENTE_SUCCESS:
            console.log(action)
            return {...state, loading: false, cliente: action.payload}
        default:
            return state

    }
}

export default cliente