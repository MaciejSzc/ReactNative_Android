import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import auth from "../reducers/auth"
import expense from "../reducers/expense"
import selection from "../reducers/selection"
import expensesData from "../reducers/expensesData"
import summary from "../reducers/summary"
import myFlat from "../reducers/myFlat"
import isLoading from "../reducers/loading"

const reducers = combineReducers({
  expense,
  expensesData,
  auth,
  selection,
  summary,
  myFlat,
  isLoading
})

export default (store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
))

// composeWithDevTools(applyMiddleware(thunk))
