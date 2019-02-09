import uuid from "uuid"
import NavigationService from "../navigation/NavigationService"
import { firebase, database } from "../firebase"
import { saveUserName } from "./utils"
import {
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  AUTH_ERROR,
  NAME_CHANGE,
  AUTH_START,
  AUTH_FINISH,
  AUTH_LOGOUT,
  INTERNET_STATUS,
  RESET_ALL,
  DELETE_PROFILE_MODAL
} from "./types"

export const switchDeleteProfileModal = isDeleteModal => ({
  type: DELETE_PROFILE_MODAL,
  isDeleteModal
})

export const deleteUser = () => {
  return dispatch => {
    firebase
      .auth()
      .currentUser.delete()
      .then(() => {
        dispatch({ type: RESET_ALL })
        NavigationService.navigate("loading")
      })
      .catch(err => {
        console.log(err)
        alert("An Error ocured, please re-login and try again")
      })
  }
}

export const onInternetStatusChange = isOnline => {
  return {
    type: INTERNET_STATUS,
    isOnline
  }
}

export const onEmailChange = email => {
  return {
    type: EMAIL_CHANGE,
    email
  }
}

export const onNameChange = name => {
  return {
    type: NAME_CHANGE,
    name
  }
}

export const onPwdChange = password => {
  return {
    type: PASSWORD_CHANGE,
    password
  }
}

export const onStartLogin = () => {
  return (dispatch, getState) => {
    dispatch({ type: AUTH_START })

    const { email, password } = getState().auth

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => dispatch({ type: AUTH_FINISH, uid: user.user.uid }))
      .catch(err => {
        dispatch({ type: AUTH_ERROR, error: err.message })
        dispatch({ type: AUTH_FINISH })
      })
  }
}

export const getName = uid => {
  return dispatch => {
    database
      .ref(`/users/${uid}/profile/name`)
      .once("value")
      .then(
        res => {
          dispatch(onNameChange(res.val()))
        },
        err => alert("Reciving name error")
      )
  }
}

export const onStartSignup = () => {
  return (dispatch, getState) => {
    let { email, password, name } = getState().auth
    name = name.trim()
    if (name.length < 1) {
      dispatch({
        type: AUTH_ERROR,
        error: "Name must be at least 1 character long"
      })
      return
    }

    dispatch({ type: AUTH_START })
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        dispatch({ type: AUTH_FINISH, uid: res.user.uid })
        saveUserName(res.user.uid, name)
      })
      .catch(err => {
        dispatch({ type: AUTH_ERROR, error: err.message })
        dispatch({ type: AUTH_FINISH })
      })
  }
}

export const onLogout = () => {
  return dispatch => {
    dispatch({ type: AUTH_START })
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: AUTH_LOGOUT })
        dispatch({ type: RESET_ALL })
        NavigationService.navigate("loading")
      })
      .catch(err => alert("cos poszlo zle z wylogowaniem :(\n", err))
  }
}

export const checkLoginStatus = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    setTimeout(() => {
      if (!!uid) {
        NavigationService.navigate("main")
      } else {
        NavigationService.navigate("auth")
      }
    }, 1000)
  }
}
