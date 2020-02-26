import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer'
import eventReducer from './eventReducer'


const rootReducer = combineReducers({
    userReducer,
    eventReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))