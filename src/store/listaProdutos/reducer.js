import * as types from "./types"

const inicialState = {
    produtcts: [],
    loading: false,
    error: "",
    nextToken: ""
}


const products = function(state = inicialState, action) {
    switch (action.type) {
        case types.LIST_PRODUCT_REQUESTED:
            return {...state, loading: true}
        case types.LIST_PRODUCT_SUCCESS:
            return {...state, loading: false, produtcts: action.payload.data.listarProduto.items, nextToken: action.payload.data.listarProduto.nextToken}
        case types.LIST_PRODUCT_FAILED:
            return {...state, loading: false, error: action.payload}
        default:
            return state

    }
}

export default products