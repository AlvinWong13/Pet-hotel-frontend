import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
// Allow creation of store
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Allow use of redux
import { Provider } from 'react-redux';
// Log each action
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

// Holds all sagas
function* rootSaga() {
  yield takeEvery('FETCH_OWNERS', fetchOwners);
  yield takeEvery('ADD_OWNER', addOwner);
  yield takeEvery('DELETE_OWNER', deleteOwner);
  yield takeEvery('FETCH_PETS', fetchPets);
  yield takeEvery('ADD_PET', addPet);
  yield takeEvery('DELETE_PET', deletePet);
}

/*** --- BEGIN OWNERS SAGAS --- ***/
function* fetchOwners() {
  try {
    console.log('in fetchOwners');
    const response = yield axios.get('/owners');

    yield put({
      type: 'SET_OWNERS',
      payload: response.data
    });
  } 
  catch (error) {
    console.log('Error fetching owners', error);
  }
} // end fetchOwners

function* addOwner(action) {
  console.log('ACTION', action.payload);
  try {
    yield axios.post('/owners', action.payload);
    yield put({
      type: 'FETCH_OWNERS'
    });
  }
  catch (error) {
    console.log('Error adding new owner', error);
  }
} // end addOwner

function* deleteOwner(action) {
  try {
    yield axios.delete(`/owners/${action.payload}`);
    yield put({
      type: 'FETCH_OWNERS'
    });
  }
  catch (error) {
    console.log('Error deleting owner', error);
  }
} // end deleteOwner
/*** --- END OWNERS SAGAS --- ***/

/*** --- BEGIN DASHBOARD SAGAS --- ***/
function* fetchPets(action) {
  try {
    let response = yield axios.get('/pets')

    yield put({
      type: 'SET_PETS',
      payload: response.data
    });
  }
  catch (error) {
    console.log('Error fetching pets', error);
  }
}

function* addPet(action) {
  try {
    const newPet = action.payload;
    yield axios.post('/pets', newPet);
    yield put({
      type: 'FETCH_PETS'
    });
  } 
  catch (error) {
    console.log('Error adding new pet', error);
  }
}

function* deletePet(action) {
  try {
    const petId = action.payload;
    yield axios.delete(`/pets/${petId}`);

    yield put({
      type: 'FETCH_PETS'
    });
  }
  catch (error) {
    console.log('Error deleting pet', error);
  }
}
/*** --- END DASHBOARD SAGAS --- ***/


// Owner reducer
const ownerReducer = (state = [], action) => {
  if (action.type === 'SET_OWNERS') {
    return action.payload;
  } else {
    return state
  }
}

// Pet reducer
const petReducer = (state = [], action) => {
  if (action.type === 'SET_PETS') {
    return action.payload;
  } else {
    return state;
  }
}

// Reducer store
const store = createStore(
  combineReducers({
    ownerReducer,
    petReducer,
  }),
  // Add sagaMiddleware
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
