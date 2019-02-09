import { SELECTED_ITEM, RESET_ALL } from "../actions/types"

const INIT_STATE = {
  selectedItem: ""
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SELECTED_ITEM:
      return { ...state, selectedItem: action.selectedItem }
    case RESET_ALL:
      return INIT_STATE
    default:
      return state
  }
}
