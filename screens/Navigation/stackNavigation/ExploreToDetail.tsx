import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, { ReactElement, useState } from 'react'
import Modal from '../../../components/ModalSorting'
import { Checkbox } from '../../../interfaces/checkbox'
import { GameCheckbox } from '../../../interfaces/gameCheckbox'
import { GamesContext } from '../../../utils/gameFilteringContext'
import { GenresContext } from '../../../utils/genreFilteringContext'
import { PlatformsContext } from '../../../utils/platformFilterContext'
import FilteringGames from '../../DetailScreens/FilteringGames'
import FilteringGenres from '../../DetailScreens/FilteringGenres'
import FilteringPlatforms from '../../DetailScreens/FilteringPlatforms'
import Details from '../../DetailScreens/GameDetails'
import Explore from '../../TabNavigationScreens/Explore'

export default (): ReactElement => {
  const [platforms, setPlatforms] = useState<Checkbox[]>([])
  const [genres, setGenres] = useState<Checkbox[]>([])
  const [games, setGames] = useState<GameCheckbox[]>([])

  const Stack = createStackNavigator()

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  }

  return (
    <PlatformsContext.Provider value={{ platforms, setPlatforms }}>
      <GenresContext.Provider value={{ genres, setGenres }}>
        <GamesContext.Provider value={{ games, setGames }}>
          <Stack.Navigator initialRouteName="Tab" screenOptions={screenOptions}>
            <Stack.Screen name="Tab" component={Explore} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen
              name="FilteringPlatforms"
              component={FilteringPlatforms}
            />
            <Stack.Screen name="FilteringGenres" component={FilteringGenres} />
            <Stack.Screen name="FilteringGames" component={FilteringGames} />
          </Stack.Navigator>
        </GamesContext.Provider>
      </GenresContext.Provider>
    </PlatformsContext.Provider>
  )
}
