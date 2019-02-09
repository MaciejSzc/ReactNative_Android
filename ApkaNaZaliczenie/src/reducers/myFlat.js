import {
  FETCH_FLAT_ID,
  RESET_ALL,
  FETCH_ADMIN_STATUS,
  SWITCH_DELETE_MODAL
} from "../actions/types"

const INIT_STATE = {
  id: "",
  isAdmin: false,
  isDeleteModalVisible: false
}

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case FETCH_FLAT_ID:
      return { ...state, id: payload }
    case FETCH_ADMIN_STATUS:
      return { ...state, isAdmin: payload }
    case RESET_ALL:
      return INIT_STATE
    case SWITCH_DELETE_MODAL:
      return { ...state, isDeleteModalVisible: payload }
    default:
      return state
  }
}
