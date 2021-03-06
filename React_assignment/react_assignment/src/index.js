import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes';
import rootReducer from './reducers/index'
import history from './history'

const Storewiththunk = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  
    <Provider store={Storewiththunk}>
      <Router history={history}>
          <Routes/>
      </Router>
    </Provider>
,
  document.getElementById('root')
);