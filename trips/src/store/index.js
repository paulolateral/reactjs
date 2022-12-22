import {createStore, applyMiddleware} from 'redux';
import rootReducer from './modules/rootReducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './modules/rootSaga';

const sagaMidleware = createSagaMiddleware();

const enhancer = applyMiddleware(sagaMidleware);

const store = createStore(rootReducer, enhancer);

sagaMidleware.run(rootSaga);

export default store;