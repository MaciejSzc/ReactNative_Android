import { database } from "../firebase"

export const saveUserName = (uid, name) => {
  console.log("to z utilsa: ", uid, name)
  database
    .ref(`/users/${uid}/profile/name`)
    .set(name)
    .then(
      res => {
        console.log(res)
      },
      err => alert("Something went wrong :(")
    )
    .catch(err => console.log("Error saving name to profile: \n", err))
}

export const saveUserFlatUid = (uid, flatuid) => {
  database
    .ref(`/users/${uid}/profile/flatuid`)
    .set(flatuid)
    .then(res => {}, err => alert("Error setting up your account :( \n", err))
    .catch(err => console.log("Error saving flatIIUD() to profile: \n", err))
}

// export const saveFlatId = (uid, flatId) => {
//   database
//     .ref(`/users/${uid}/flatid/`)
//     .set(flatId)
//     .then(res => {}, err => alert(err))
//     .catch(err => alert(err))
// }
