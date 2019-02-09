import { SWITCH_LOADING, RESET_ALL } from "../actions/types"

export default (state = false, { type, thisBoolean }) => {
  switch (type) {
    case SWITCH_LOADING:
      return thisBoolean
    case RESET_ALL:
      return false
    default:
      return state
  }
}
