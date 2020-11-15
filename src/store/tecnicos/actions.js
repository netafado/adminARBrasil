import {
    LIST_TECNICO_REQUESTED,
    LIST_TECNICO_SUCCESS,
	LIST_TECNICO_FAILED,

	ADD_TECNICO_REQUESTED,
	ADD_TECNICO_SUCCESS,
	ADD_TECNICO_FAILED,

	DELETE_TECNICO_REQUESTED,
	DELETE_TECNICO_SUCCESS,
	DELETE_TECNICO_FAILED,

	UPDATE_TECNICO_REQUESTED,
	UPDATE_TECNICO_SUCCESS,
	UPDATE_TECNICO_FAILED,
	CLEAR_TECNICO_FIELDS
} from "./types";

export const listarTecnicos = () => {
	return{
		type: LIST_TECNICO_REQUESTED,
		payload: true
	}
};

export const listarTecnicosSucess = (cliente) => ({
	type:  LIST_TECNICO_SUCCESS,
	payload: cliente
});

export const listarTecnicosFailed = (error) => ({
	type: LIST_TECNICO_FAILED,
	payload: error
});

export const addTecnico = (values, history) => ({
	type: ADD_TECNICO_REQUESTED,
	payload: {values, history}
});

export const addTecnicoSucess = (cliente) => ({
	type: ADD_TECNICO_SUCCESS,
	payload: cliente
});

export const addTecnicoFaild = (error) => ({
	type: ADD_TECNICO_FAILED,
	payload: error
});


export const deleteTecnico = (error) => ({
	type: DELETE_TECNICO_REQUESTED,
	payload: error
});

export const deleteTecnicoSuccess = (error) => ({
	type: DELETE_TECNICO_SUCCESS,
	payload: error
});

export const deleteTecnicoFaild = (error) => ({
	type: DELETE_TECNICO_FAILED,
	payload: error
});


export const updateTecnico_action = (values, history) => ({
	type: UPDATE_TECNICO_REQUESTED,
	payload: {values, history}
});

export const updateTecnicoSucess = (cliente) => ({
	type: UPDATE_TECNICO_SUCCESS,
	payload: cliente
});

export const updateTecnicoFaild = (error) => ({
	type: UPDATE_TECNICO_FAILED,
	payload: error
});

export const clearFieldsTecnico = () => ({
	type: CLEAR_TECNICO_FIELDS,
	payload: true
});