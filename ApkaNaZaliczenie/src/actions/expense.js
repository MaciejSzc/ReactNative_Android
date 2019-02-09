import {
  EXPENSE_PROP_CHANGED,
  FETCH_EXPENSES,
  RESET_EXPENSE,
  EXPENSE_PROP_ERROR
} from "./types"

import { database } from "../firebase"

export const onPropChange = (prop, val) => {
  return {
    type: EXPENSE_PROP_CHANGED,
    payload: { prop, val }
  }
}

export const onSaveExpense = (expense, uid, name, error) => {
  return (dispatch, getState) => {
    expense.uid = uid
    expense.name = name
    const flatId = getState().myFlat.id

    if (!error) {
      database
        .ref(`/flats/${flatId}/expenses/`)
        .push(expense)
        .then(
          () => {
            // jakas informacja ze zapisano expense
          },
          err => alert("PROBLEM ", err)
        )
    } else if (error) {
      alert(error)
    }
  }
}

export const isExpenseError = ({ title, amount, date }) => {
  if (title.length < 1) {
    return "Title must be at least 1 character long"
  } else if (amount < 1) {
    return "Minimal amount is 1"
  } else if (!date) {
    return "date is requied"
  }
}

export const getExpensesData = flatId => {
  return (dispatch, getState) => {
    database.ref(`/flats/${flatId}/expenses/`).on(
      "value",
      snapshot => {
        if (!!snapshot.val()) {
          const data = Object.entries(snapshot.val()).map(arr => {
            let obj = arr[1]
            obj.key = arr[0]
            return obj
          })
          dispatch({
            type: FETCH_EXPENSES,
            expenses: data
          })
        } else {
          dispatch({
            type: FETCH_EXPENSES,
            expenses: []
          })
        }
      },
      err => {
        alert("Couldnt get your expenses")
      }
    )
  }
}

export const deleteExpense = key => {
  return (dispatch, getState) => {
    const flatId = getState().myFlat.id
    database
      .ref(`/flats/${flatId}/expenses/${key}`)
      .set(null)
      .then(
        () => {
          // tutaj jakis wygasajacy modal dodaj
        },
        () => {
          alert("couldnt delete expense")
        }
      )
  }
}

export const resetExpense = () => ({ type: RESET_EXPENSE })
