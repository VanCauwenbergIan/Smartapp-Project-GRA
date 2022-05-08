import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, { ReactElement, useState } from 'react'
import Modal from '../../../components/ModalSorting'
import { Checkbox } from '../../../interfaces/checkbox'
import { GenresContext } from '../../../utils/genreFilteringContext'
import { PlatformsContext } from '../../../utils/platformFilterContext'
import Filtering from '../../DetailScreens/Filtering'
import Details from '../../DetailScreens/GameDetails'
import Explore from '../../TabNavigationScreens/Explore'

export default (): ReactElement => {
  const [platforms, setPlatforms] = useState<Checkbox[]>([])
  const [genres, setGenres] = useState<Checkbox[]>([])

  const Stack = createStackNavigator()

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  }

  return (
    <PlatformsContext.Provider value={{ platforms, setPlatforms }}>
      <GenresContext.Provider value={{ genres, setGenres }}>
        <Stack.Navigator initialRouteName="Tab" screenOptions={screenOptions}>
          <Stack.Screen name="Tab" component={Explore} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Filtering" component={Filtering} />
        </Stack.Navigator>
      </GenresContext.Provider>
    </PlatformsContext.Provider>
  )
}
