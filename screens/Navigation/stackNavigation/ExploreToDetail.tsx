import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, { ReactElement } from 'react'
import Modal from '../../../components/ModalSorting'
import Details from '../../DetailScreens/GameDetails'
import Explore from '../../TabNavigationScreens/Explore'

export default (): ReactElement => {
  const Stack = createStackNavigator()

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  }

  return (
    <Stack.Navigator initialRouteName="Tab" screenOptions={screenOptions}>
      <Stack.Screen name="Tab" component={Explore} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}
