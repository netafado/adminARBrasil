import {
    CREATE_PRODUCT_REQUESTED,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILED
} from "./types";

export const saveNewProduct = (values) => ({
	type: CREATE_PRODUCT_REQUESTED,
	payload: values
});

export const saveNewProductSuccess = (product) => ({
	type: CREATE_PRODUCT_SUCCESS,
	payload: product
});


export const saveNewProductfailed = (error) => ({
	type: CREATE_PRODUCT_FAILED,
	payload: error
});






