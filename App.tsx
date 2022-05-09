import { StatusBar } from 'expo-status-bar'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useEffect } from 'react'
import { setBackgroundColorAsync } from 'expo-navigation-bar'
import { useFonts } from 'expo-font'
import { LogBox } from 'react-native'

import { theme_main } from './styles/colors'
import CoreStyle from './styles/core'
import AppLoading from 'expo-app-loading'
import OnboardingStack from './screens/Navigation/stackNavigation/OnboardingStack'

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

  // caused by firebase
  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  ])
  // cause by firebase database
  LogBox.ignoreLogs([
    'Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.',
  ])

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
          <OnboardingStack />
        </SafeAreaProvider>
      </NavigationContainer>
    )
  }
}
