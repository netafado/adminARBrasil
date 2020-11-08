import {
    LIST_PRODUCT_REQUESTED,
    LIST_PRODUCT_SUCCESS,
    LIST_PRODUCT_FAILED
} from "./types";

export const listarProdutos = () => {
	return{
		type: LIST_PRODUCT_REQUESTED,
		payload: true
	}
};

export const listarProdutosSucesso = (product) => ({
	type:  LIST_PRODUCT_SUCCESS,
	payload: product
});


export const listaProdutosFalhou = (error) => ({
	type: LIST_PRODUCT_FAILED,
	payload: error
});






