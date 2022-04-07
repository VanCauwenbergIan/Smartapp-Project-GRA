import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TabNavigation from './screens/TabNavigation'
import { useEffect } from 'react'
import { setBackgroundColorAsync } from 'expo-navigation-bar'

import { theme_main } from './styles/colors'
import CoreStyle from './styles/core'

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme_main.xx_dark,
  },
}

export default function App() {
  useEffect(() => {
    setBackgroundColorAsync(theme_main.x_dark)
  }, [])

  return (
    <NavigationContainer theme={CustomTheme}>
      <SafeAreaProvider style={CoreStyle.background_dark}>
        <StatusBar style="inverted" />
        <TabNavigation />
      </SafeAreaProvider>
    </NavigationContainer>
  )
}
