import * as types from "./types"

const inicialState = {
    produtcts: [],
    loading: false,
    newProduct: null,
    error: ""
}


const products = function(state = inicialState, action) {
    switch (action.type) {
        case types.CREATE_PRODUCT_REQUESTED:
            return {...state, loading: true}
        case types.CREATE_PRODUCT_SUCCESS:
            return {...state, loading: false, newProduct: action.payload}
        default:
            return state

    }
}

export default products