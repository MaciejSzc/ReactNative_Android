import { FETCH_EXPENSES, RESET_ALL } from "../actions/types"

const INIT_STATE = []

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_EXPENSES:
      return action.expenses
    case RESET_ALL:
      return INIT_STATE
    default:
      return state
  }
}
