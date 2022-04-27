import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import Explore from '../../TabNavigationScreens/Explore'
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons'
import { View } from 'react-native'
import AnticipatedToDetail from '../stackNavigation/AnticipatedToDetail'
import TrendingToDetail from '../stackNavigation/TrendingToDetail'
import HomeToDetail from '../stackNavigation/HomeToDetail'

import { theme_accent, theme_main } from '../../../styles/colors'
import ButtonsStyle from '../../../styles/buttons'
import UtilsStyle from '../../../styles/utils'
import AccountToDetail from '../stackNavigation/AccountToDetail'

export default () => {
  const Tab = createBottomTabNavigator()

  const iconSize = 32

  const screenOptions: BottomTabNavigationOptions = {
    tabBarStyle: {
      backgroundColor: theme_main.x_dark,
      height: 72,
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      borderTopWidth: 0,
    },
    tabBarActiveTintColor: theme_main.light,
    tabBarInactiveTintColor: theme_main.light_50,
    headerShown: false,
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
  }

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeToDetail}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={iconSize}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Trending"
        component={TrendingToDetail}
        options={{
          tabBarLabel: 'Trending',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="game-controller-outline"
              size={iconSize}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                ButtonsStyle.central_icon,
                UtilsStyle.center_content,
                {
                  backgroundColor: focused
                    ? theme_accent.alpha
                    : theme_accent.alpha_dark,
                  borderRadius: 20,
                },
              ]}
            >
              <MaterialIcons
                name="search"
                size={iconSize}
                color={theme_main.light}
                focused={focused}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ReleaseRadar"
        component={AnticipatedToDetail}
        options={{
          tabBarLabel: 'ReleaseRadar',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="radar"
              size={iconSize}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountToDetail}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={iconSize}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
