import {
  RESET_ALL,
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  AUTH_ERROR,
  NAME_CHANGE,
  AUTH_START,
  AUTH_FINISH,
  AUTH_LOGOUT,
  AUTH_CHECK,
  INTERNET_STATUS,
  DELETE_PROFILE_MODAL
} from "../actions/types"

const INIT_STATE = {
  name: "",
  uid: "",
  email: "",
  password: "",
  error: "",
  isLoading: false,
  isOnline: false,
  isDeleteModal: false
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGE:
      return { ...state, email: action.email }
    case PASSWORD_CHANGE:
      return { ...state, password: action.password }
    case NAME_CHANGE:
      return { ...state, name: action.name }
    case AUTH_START:
      return { ...state, isLoading: true }
    case AUTH_FINISH:
      return {
        ...state,
        uid: action.uid,
        isLoading: false,
        email: "",
        password: ""
      }
    case AUTH_ERROR:
      return { ...state, error: action.error }
    case AUTH_LOGOUT:
      return INIT_STATE
    case AUTH_CHECK:
    case RESET_ALL:
      return INIT_STATE
    case INTERNET_STATUS:
      return { ...state, isOnline: action.isOnline }
    case DELETE_PROFILE_MODAL:
      return { ...state, isDeleteModal: action.isDeleteModal }
    default:
      return state
  }
}
