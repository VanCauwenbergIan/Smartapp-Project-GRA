import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TabNavigation from './screens/TabNavigation'
import { useEffect } from 'react'
import { setBackgroundColorAsync } from 'expo-navigation-bar'

import { theme_main } from './styles/colors'

export default function App() {
  useEffect(() => {
    setBackgroundColorAsync(theme_main.x_dark)
  }, [])

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar style="inverted" />
        <TabNavigation />
      </SafeAreaProvider>
    </NavigationContainer>
  )
}
