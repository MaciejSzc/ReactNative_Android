import React from "react"
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation"
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"
import LoginScreen from "../components/screens/LoginScreen"
import LoadingScreen from "../components/screens/LoadingScreen"
import SignupScreen from "../components/screens/SignupScreen"
import MyBudgetScreen from "../components/screens/MyBudgetScreen"
import AddExpenseScreen from "../components/screens/AddExpenseScreen"
import Icon from "react-native-vector-icons/FontAwesome"
import SummaryScreen from "../components/screens/SummaryScreen"
import InviteScreen from "../components/screens/InviteScreen"
import CreateFlatScreen from "../components/screens/CreateFlatScreen"
import QRScannerScreen from "../components/screens/QRScannerScreen"
import ReckoningScreen from "../components/screens/ReckoningScreen"
import ProfileScreen from "../components/screens/ProfileScreen"
import { ResetRoomModal } from "../components/common"

const authStack = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerTransparent: true
    }
  }
)

const myBudgetStack = createStackNavigator(
  {
    Main: MyBudgetScreen,
    Add: AddExpenseScreen
  },
  {
    initialRouteName: "Main",
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerTransparent: true
    }
  }
)

const SharingStack = createStackNavigator(
  {
    invite: InviteScreen,
    qrscan: QRScannerScreen
  },
  {
    initialRouteName: "invite",
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerTransparent: true
    }
  }
)

const expensesStack = createSwitchNavigator(
  {
    flatBudget: myBudgetStack,
    createFlat: CreateFlatScreen
  },
  {
    initialRouteName: "createFlat"
  }
)
const SummaryStack = createStackNavigator(
  {
    summary: SummaryScreen,
    reckoning: ReckoningScreen
  },
  {
    initialRouteName: "summary",
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerTransparent: true
    }
  }
)

const mainStack = createMaterialBottomTabNavigator(
  {
    Summary: {
      screen: SummaryStack,
      navigationOptions: {
        tabBarLabel: "Summary",
        tabBarIcon: ({ focused }) => {
          let tintColor = focused ? "#E80080" : "rgba(255,255,255,0.4)"
          return <Icon name='money' color={tintColor} size={25} />
        }
      }
    },
    ExpensesStack: {
      screen: expensesStack,
      navigationOptions: {
        tabBarLabel: "Expenses",
        tabBarIcon: ({ focused }) => {
          let tintColor = focused ? "#E80080" : "rgba(255,255,255,0.4)"
          return <Icon name='list-ul' color={tintColor} size={25} />
        }
      }
    },
    Sharing: {
      screen: SharingStack,
      navigationOptions: {
        tabBarLabel: "Sharing",
        tabBarIcon: ({ focused }) => {
          let tintColor = focused ? "#E80080" : "rgba(255,255,255,0.4)"
          return <Icon name='share' color={tintColor} size={25} />
        }
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ focused }) => {
          let tintColor = focused ? "#E80080" : "rgba(255,255,255,0.4)"
          return <Icon name='user' color={tintColor} size={25} />
        }
      }
    }
  },
  {
    initialRouteName: "Summary",
    activeColor: "#E80987",
    inactiveColor: "rgba(255,255,255,0.8)",
    barStyle: {
      backgroundColor: "#222",
      borderTopWidth: 1,
      borderColor: "rgba(255,255,255,0.8)"
    }
  }
)

export const RootApp = createSwitchNavigator(
  {
    loading: LoadingScreen,
    auth: authStack,
    main: mainStack
  },
  {
    initialRouteName: "loading"
  }
)

export default createAppContainer(RootApp)
