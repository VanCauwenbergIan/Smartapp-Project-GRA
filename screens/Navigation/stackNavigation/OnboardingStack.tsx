import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { ReactElement } from 'react'
import Login from '../../OnboardingScreens/Login'
import Recovery from '../../OnboardingScreens/Recovery'
import Signup from '../../OnboardingScreens/Signup'
import StartScreen from '../../OnboardingScreens/StartScreen'
import Verify from '../../OnboardingScreens/Verify'
import TabNavigation from '../tabNavigation/TabNavigation'

export default (): ReactElement => {
  const Stack = createStackNavigator()

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  }

  return (
    <Stack.Navigator initialRouteName="Start" screenOptions={screenOptions}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Verify" component={Verify} />
      <Stack.Screen name="Recovery" component={Recovery} />
      <Stack.Screen name="Tab" component={TabNavigation} />
    </Stack.Navigator>
  )
}
