import { database } from "../firebase"
import { FETCH_FLAT_ID, FETCH_ADMIN_STATUS, SWITCH_DELETE_MODAL } from "./types"
import { joinMembers } from "./summary"

export const exitFlat = (uid, flatId) => {
  return async dispatch => {
    await database
      .ref(`/users/${uid}/flatid/`)
      .remove()
      .then(res => {}, err => alert(err))
      .catch(err => alert(err))

    await database
      .ref(`/flats/${flatId}/members/${uid}`)
      .remove()
      .then(() => {}, err => alert(err))
      .catch(err => alert(err))
    dispatch({ FETCH_ADMIN_STATUS, payload: false })
  }
}

export const saveFlatId = (uid, flatId) => {
  database
    .ref(`/users/${uid}/flatid/`)
    .set(flatId)
    .then(res => {}, err => alert(err))
    .catch(err => alert(err))
}

export const joinFlat = (flatId, uid, name) => {
  database
    .ref(`/flats/${flatId}/members/${uid}`)
    .set({ name })
    .then(() => {})
}

export const startCreateFlat = () => {
  return (dispatch, getState) => {
    const { uid, name } = getState().auth
    database
      .ref("/flats/")
      .push({ admin: uid, members: uid })
      .then(
        res => {
          flatId = res.key
          dispatch({ type: FETCH_FLAT_ID, payload: res.key })
          dispatch({ type: FETCH_ADMIN_STATUS, payload: true })
          saveFlatId(uid, res.key)
          joinMembers(res.key, uid, name)
        },
        err => {
          alert(err.message)
        }
      )
  }
}

export const fetchAdminStatus = (flatId, uid) => {
  return dispatch => {
    database
      .ref(`/flats/${flatId}/admin/`)
      .once("value")
      .then(id => {
        id.val() === uid
          ? dispatch({ type: FETCH_ADMIN_STATUS, payload: true })
          : dispatch({ type: FETCH_ADMIN_STATUS, payload: false })
      })
      .catch(err => alert("Couldnt get your admin status"))
  }
}

export const fetchFlatId = uid => {
  console.log("z FETCH FLAT ID, UID: ", uid)
  return dispatch => {
    database.ref(`/users/${uid}/flatid/`).on(
      "value",
      snapshot => {
        dispatch({ type: FETCH_FLAT_ID, payload: snapshot.val() })
      },
      err => {
        alert("Couldnt connect you to a flat")
      }
    )
  }
}

export const resetRoom = flatId => {
  database
    .ref(`/flats/${flatId}/expenses/`)
    .remove()
    .then(() => console.log("USUNIETO FLATA (Z CALLBACKA Z ACTIONA Z MYFLAT"))
    .catch(() => alert("Some error ocured"))
}

export const deleteRoom = async flatId => {
  await database
    .ref(`/flats/${flatId}/`)
    .remove()
    .then(() => console.log("USUNIETO FLATA (Z CALLBACKA Z ACTIONA Z MYFLAT"))
    .catch(() => alert("Some error ocured"))
  await database
    .ref(`/users/${uid}/flatid/`)
    .remove()
    .then(res => {}, err => alert(err))
    .catch(err => alert(err))
}

export const switchDeleteModal = isVisible => {
  console.log("poszlo z actiona delete")
  return {
    type: SWITCH_DELETE_MODAL,
    payload: isVisible
  }
}
