import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, { ReactElement } from 'react'
import Details from '../../DetailScreens/GameDetails'
import Account from '../../TabNavigationScreens/Account'
import Home from '../../TabNavigationScreens/Home'

export default (): ReactElement => {
  const Stack = createStackNavigator()

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  }

  return (
    <Stack.Navigator initialRouteName="Tab" screenOptions={screenOptions}>
      <Stack.Screen name="Tab" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}
