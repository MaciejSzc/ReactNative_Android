import { database } from "../firebase"
import {
  GET_SUMMARY,
  GET_MEMBERS_LIST,
  GET_RECKONING,
  ADD_MEMBER_SUMMARY,
  RESET_SUMMARY,
  SWITCH_RESET_MODAL
} from "./types"

export const getSummary = () => {
  return (dispatch, getState) => {
    let expenses = getState().expensesData
    if (expenses.length > 0) {
      let summary = expenses
        .map(el => {
          return parseInt(el.amount)
        })
        .reduce((a, b) => a + b)
      dispatch({
        type: GET_SUMMARY,
        summary
      })
    } else {
      dispatch({
        type: GET_SUMMARY,
        summary: 0
      })
    }
  }
}

export const getMembersList = flatId => {
  return dispatch => {
    database
      .ref(`/flats/${flatId}/members/`)
      .once("value")
      .then(
        snapshot => {
          if (typeof snapshot.val() === "string") {
            let members = []
            members.push(snapshot.val().name)
            dispatch({ type: GET_MEMBERS_LIST, members })
          } else {
            let members = Object.values(snapshot.val()).map(el => el.name)
            dispatch({ type: GET_MEMBERS_LIST, members })
          }
        },
        err => alert("getmemberlist err: ", err)
      )
  }
}

export const getMembersListFromExpensesData = expensesData => {
  return dispatch => {
    names = expensesData.map(el => {
      return el.name
    })

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index
    }

    let members = names.filter(onlyUnique)
    dispatch({ type: GET_MEMBERS_LIST, members })
  }
}

export const getPersonalSummary = (member, expensesData) => {
  return dispatch => {
    const personalSummary = expensesData
      .map(exp => {
        if (member === exp.name) {
          return parseInt(exp.amount)
        } else {
          return 0
        }
      })
      .reduce((a, b) => a + b)
    dispatch({
      type: ADD_MEMBER_SUMMARY,
      payload: { member, personalSummary }
    })
  }
}

export const resetSummary = () => ({ type: RESET_SUMMARY })

export const getReckoning = (summary, personalSummaries) => {
  const targetEachPerson = summary / personalSummaries.length
  const reckoning = personalSummaries.map(person => {
    return {
      name: person.member,
      reckoning: person.personalSummary - targetEachPerson
    }
  })
  return {
    type: GET_RECKONING,
    reckoning
  }
}

export const joinMembers = (flatId, uid, name) => {
  database
    .ref(`/flats/${flatId}/members/`)
    .push({ name, uid })
    .then(
      () => {
        // dac znac klientowi ze udalo sie zapisac go jako membera
      },
      err => alert("Something went wrong :( \n", err)
    )
}

export const switchResetModal = isResetModalVisible => {
  return {
    type: SWITCH_RESET_MODAL,
    isResetModalVisible
  }
}
