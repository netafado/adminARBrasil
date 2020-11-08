import {
    CREATE_PRODUCT_REQUESTED,
    CREATE_PRODUCT_SUCCESS,
	CREATE_PRODUCT_FAILED,
	
	DELETE_PRODUCT_REQUESTED,
	DELETE_PRODUCT_SUCCESS,

	UPDATE_PRODUCT_REQUESTED,
	UPDATE_PRODUCT_SUCCESS
} from "./types";

export const saveNewProduct = (values, history) => ({
	type: CREATE_PRODUCT_REQUESTED,
	payload: {values, history}
});

export const saveNewProductSuccess = (product) => ({
	type: CREATE_PRODUCT_SUCCESS,
	payload: product
});

export const saveNewProductfailed = (error) => ({
	type: CREATE_PRODUCT_FAILED,
	payload: error
});

export const deleteProduct = (pk) =>({
	type: DELETE_PRODUCT_REQUESTED,
	payload: pk
})

export const deleteProdutctSucess = (product) =>({
	type: DELETE_PRODUCT_SUCCESS,
	payload: product
})

export const updateProduct  = (values, history) => ({
	type: UPDATE_PRODUCT_REQUESTED,
	payload: {values, history}
});


export const updateProductSucess  = (product) => ({
	type: UPDATE_PRODUCT_SUCCESS,
	payload: product
});