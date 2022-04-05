import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import Account from './TabNavigationScreens/Account'
import Explore from './TabNavigationScreens/Explore'
import Home from './TabNavigationScreens/Home'
import ReleaseRadar from './TabNavigationScreens/ReleaseRadar'
import Trending from './TabNavigationScreens/Trending'

export default () => {
  const Tab = createBottomTabNavigator()

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
  }

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Trending" component={Trending} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="ReleaseRadar" component={ReleaseRadar} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  )
}
