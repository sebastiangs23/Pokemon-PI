import {applyMiddleware, legacy_createStore as createStore} from "redux"
import thunk from "redux-thunk"
import reducers from "./reducer/reducer"

const store = createStore(reducers, applyMiddleware(thunk))

export default store;