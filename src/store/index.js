import {createStore, compose, applyMiddleware} from "redux"
import rootReducer from "./reducers"
import createSagaMiddleaware from "redux-saga";
import rootSaga from "./sagas"

const sagaMiddleare = createSagaMiddleaware();
let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && 
window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
    devTools = a => a;
}
const store = compose(
    applyMiddleware(sagaMiddleare),
    devTools
)(createStore)(rootReducer);

sagaMiddleare.run(rootSaga)

export default store