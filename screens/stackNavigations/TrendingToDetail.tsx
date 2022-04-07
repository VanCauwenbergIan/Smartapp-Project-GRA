import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, { ReactElement } from 'react'
import Details from '../DetailScreens/GameDetails'
import Trending from '../TabNavigationScreens/Trending'

export default (tab: React.ComponentType): ReactElement => {
  const Stack = createStackNavigator()

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  }

  return (
    <Stack.Navigator initialRouteName="Tab" screenOptions={screenOptions}>
      <Stack.Screen name="Tab" component={Trending} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}
