
import * as types from "./types"
const initicialState = {
    chamados: [
        { title: "Em aberto", iconClass: "bx-copy-alt", total: "0", color:"bg-pink" },
        { title: "Fechado sem solução", iconClass: "bx bx-bomb", total: "0", color:"bg-danger" },
        { title: "Em andamento", iconClass: "bx bx-briefcase-alt", total: "0", color:"bg-warning" },
        { title: "Resolvidos", iconClass: "bx bx-check-double", total: "0", color:"bg-success" }
    ],
    loading: true,
    error: null
}


const infoGerais = (state = initicialState, action ) => {
    switch (action.type) {
        case types.GET_CHAMADOS_REQUESTED:
            return {...state, loading: true}
        case types.GET_CHAMADOS_SUCCESS:
            return {...state, loading: false, chamados: action.payload}
        default:
            return state

    }
}

export default infoGerais