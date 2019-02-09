import {
  GET_SUMMARY,
  RESET_ALL,
  GET_MEMBERS_LIST,
  GET_MEMBERS_PROFILES,
  ADD_MEMBER_PROFILE,
  ADD_MEMBER_SUMMARY,
  RESET_SUMMARY,
  GET_RECKONING,
  SWITCH_RESET_MODAL
} from "../actions/types"

const INIT_STATE = {
  summary: null,
  members: null,
  personalSummaries: [],
  reckoning: [],
  isResetModalVisible: false
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SUMMARY:
      return { ...state, summary: action.summary }
    case GET_MEMBERS_LIST:
      return { ...state, members: action.members }
    case GET_MEMBERS_PROFILES:
      return { ...state, membersProfiles: action.membersProfiles }
    case GET_RECKONING:
      return { ...state, reckoning: action.reckoning }
    case ADD_MEMBER_PROFILE:
      return { ...state, membersProfiles: action.profiles }
    case ADD_MEMBER_SUMMARY:
      return {
        ...state,
        personalSummaries: [...state.personalSummaries, action.payload]
      }
    case SWITCH_RESET_MODAL:
      return { ...state, isResetModalVisible: action.isResetModalVisible }
    case RESET_SUMMARY:
      return { ...state, personalSummaries: [] }
    case RESET_ALL:
      return INIT_STATE
    default:
      return state
  }
}
