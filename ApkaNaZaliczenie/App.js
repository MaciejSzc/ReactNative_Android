import React from "react"
import { Provider } from "react-redux"
import store from "./src/store/store"
import { NativeModules } from "react-native"
import NavigationService from "./src/navigation/NavigationService"
import RootApp from "./src/navigation"

const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

const TopLevelNavigator = RootApp

console.disableYellowBox = true

export default class App extends React.Component {
  render() {
    console.log(store)
    return (
      <Provider store={store}>
        <TopLevelNavigator
          ref={RootApp => {
            NavigationService.setTopLevelNavigator(RootApp)
          }}
        />
      </Provider>
    )
  }
}
