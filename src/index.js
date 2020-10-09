import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware,compose } from 'redux'
import {Provider} from 'react-redux'
import reducer from './store/reducer'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const logger = store =>{
  return next => {
    return action => {
      const result =  next(action)
      console.log(store.getState())
      return result
    }
  }
}

// const store = createStore(reducer,applyMiddleware(logger))

//Including redux devtools support 
const store = createStore(reducer,composeEnhancers(applyMiddleware(logger)))

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(app,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
