import {
  EXPENSE_PROP_ERROR,
  EXPENSE_PROP_CHANGED,
  RESET_ALL,
  RESET_EXPENSE
} from "../actions/types"

const INIT_STATE = {
  amount: null,
  title: "",
  description: "",
  date: "",
  uid: "",
  error: ""
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case EXPENSE_PROP_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.val }
    case RESET_ALL:
      return INIT_STATE
    case EXPENSE_PROP_ERROR:
      return { ...state, error: action.error }
    case RESET_EXPENSE:
      return INIT_STATE
    default:
      return state
  }
}
