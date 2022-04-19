import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TabNavigation from './screens/TabNavigation'
import { useEffect } from 'react'
import { setBackgroundColorAsync } from 'expo-navigation-bar'
import { useFonts } from 'expo-font'

import { theme_main } from './styles/colors'
import CoreStyle from './styles/core'
import AppLoading from 'expo-app-loading'

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme_main.xx_dark,
  },
}

export default function App() {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-MediumItalic': require('./assets/fonts/Roboto-MediumItalic.ttf'),
  })

  useEffect(() => {
    setBackgroundColorAsync(theme_main.x_dark)
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <NavigationContainer theme={CustomTheme}>
        <SafeAreaProvider style={CoreStyle.background_dark}>
          <StatusBar style="inverted" />
          <TabNavigation />
        </SafeAreaProvider>
      </NavigationContainer>
    )
  }
}
