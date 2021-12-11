import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas/rootSaga';
import rootReducers from './reducers/rootReducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducers,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  ),
);

sagas.map((saga) => sagaMiddleware.run(saga));

export default store;
