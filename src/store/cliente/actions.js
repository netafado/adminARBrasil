import * as types from "./types"

export const getCliente = (id) => ({
	type:  types.GET_CLIENTE,
	payload: id
});


export const getClienteSucess = (cliente) => ({
	type:  types.GET_CLIENTE_SUCCESS,
	payload: cliente
});


export const getClienteFailed = (cliente) => ({
	type:  types.GET_CLIENTE_FAILED,
	payload: cliente
});