import { NetInfo } from "react-native"
import * as firebase from "firebase"
import store from "../store/store"
import { onNameChange, onInternetStatusChange } from "../actions/auth"
import NavigationService from "../navigation/NavigationService"
import { AUTH_FINISH, FETCH_FLAT_ID } from "../actions/types"

var config = {
  apiKey: "AIzaSyBHhMjKX687zhmO727CzISz_Z2nGFRNlaY",
  authDomain: "flatmate-budget.firebaseapp.com",
  databaseURL: "https://flatmate-budget.firebaseio.com",
  projectId: "flatmate-budget",
  storageBucket: "flatmate-budget.appspot.com",
  messagingSenderId: "1078793321237"
}

firebase.initializeApp(config)
const database = firebase.database()

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user)
    // Listen to changes in flat from server
    database.ref(`/users/${user.uid}/flatid`).on(
      "value",
      snapshot => {
        store.dispatch({ type: FETCH_FLAT_ID, payload: snapshot.val() })
      },
      err => {
        alert("something went wrong :( ", err)
      }
    )
    // fetch users name from server
    console.log(user)
    database
      .ref(`/users/${user.uid}/profile/name`)
      .once("value")
      .then(
        res => {
          store.dispatch(onNameChange(res.val()))
        },
        err => alert("Reciving name error")
      )
    //finish auth process
    store.dispatch({ type: AUTH_FINISH, uid: user.uid })

    //navigate user to main screen
    NavigationService.navigate("main")
  } else {
    // navigate user to auth stack
    NavigationService.navigate("auth")
  }
})

// checking online status
NetInfo.getConnectionInfo().then(connectionInfo => {
  if (connectionInfo === "none") {
    store.dispatch(onInternetStatusChange(false))
  } else {
    store.dispatch(onInternetStatusChange(true))
    console.log("mam internte")
  }
})

export { firebase, database }
