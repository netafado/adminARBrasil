import * as types from "./types"

const inicialState = {
    loading: false,
    newProduct: null,
    error: "",
    deleteProduct: null,
    updateProduct: null
}


const products = function(state = inicialState, action) {
    switch (action.type) {
        case types.CREATE_PRODUCT_REQUESTED:
            return {...state, loading: true}
        case types.CREATE_PRODUCT_SUCCESS:
            return {...state, loading: false, newProduct: action.payload}

        // deletar produto
        case types.DELETE_PRODUCT_REQUESTED:
            return {...state, loading: true}
        case types.DELETE_PRODUCT_SUCCESS:
            return {...state, loading: false, deleteProduct: action.payload}


        // update produto
        case types.UPDATE_PRODUCT_REQUESTED:
            return {...state, loading: true}
        case types.UPDATE_PRODUCT_SUCCESS:
            return {...state, loading: false, deleteProduct: action.payload}


        default:
            return state

    }
}

export default products