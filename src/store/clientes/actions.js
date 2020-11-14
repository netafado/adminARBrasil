import {
    LIST_CLIENTE_REQUESTED,
    LIST_CLIENTE_SUCCESS,
	LIST_CLIENTE_FAILED,
	ADD_CLIENTE_REQUESTED,
	ADD_CLIENTE_SUCCESS,
	ADD_CLIENTE_FAILED,
	DELETE_CLIENTE_REQUESTED,
	UPDATE_CLIENTE_REQUESTED,
	UPDATE_CLIENTE_SUCCESS
} from "./types";

export const listarClientes = () => {
	return{
		type: LIST_CLIENTE_REQUESTED,
		payload: true
	}
};

export const listarProdutosSucesso = (cliente) => ({
	type:  LIST_CLIENTE_SUCCESS,
	payload: cliente
});

export const listaProdutosFalhou = (error) => ({
	type: LIST_CLIENTE_FAILED,
	payload: error
});

export const saveNewCliente = (values, history) => ({
	type: ADD_CLIENTE_REQUESTED,
	payload: {values, history}
});

export const saveNewClienteSuccess = (cliente) => ({
	type: ADD_CLIENTE_SUCCESS,
	payload: cliente
});

export const saveNewClientefailed = (error) => ({
	type: ADD_CLIENTE_FAILED,
	payload: error
});


export const deleteCliente = (pk) => ({
	type: DELETE_CLIENTE_REQUESTED,
	payload: pk
});

export const deleteClienteSucess = (cliente) => ({
	type: DELETE_CLIENTE_REQUESTED,
	payload: cliente
});


export const updateCliente = (values, history) => ({
	type: UPDATE_CLIENTE_REQUESTED,
	payload: {values, history}
});

export const updateClienteSucess = (cliente) => ({
	type: UPDATE_CLIENTE_SUCCESS,
	payload: cliente
});






