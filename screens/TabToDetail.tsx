import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, { ReactElement } from 'react'
import Details from './DetailScreens/GameDetails'

export default (tab: React.ComponentType): ReactElement => {
  const Stack = createStackNavigator()

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  }

  return (
    <Stack.Navigator initialRouteName="Tab">
      <Stack.Screen name="Tab" component={tab} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}
