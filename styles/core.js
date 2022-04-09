import { StyleSheet } from 'react-native'
import { theme_main } from './colors'

export default StyleSheet.create({
  background_dark: {
    backgroundColor: theme_main.xx_dark,
  },

  background_light: {
    backgroundColor: theme_main.x_dark,
  },

  main_container: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  sub_container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  top_bar: {
    position: 'absolute',
    top: 0,
    zIndex: 10,
    paddingTop: 44,

    height: 96,
    width: '100%',

    backgroundColor: 'rgba(24, 29, 35, 0.5)',
  },

  screenshot_container: {
    position: 'absolute',
    top: 0,

    width: '100%',
    height: 376,
  },

  information_container: {
    marginTop: 376,
  },

  chart_backdrop_sm: {
    width: 100,
    height: 100,

    backgroundColor: theme_main.xx_dark,

    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'rgba(240, 240, 240, 0.1)',
  },

  chart_backdrop_lg: {
    width: 120,
    height: 120,

    backgroundColor: theme_main.xx_dark,
    zIndex: 5,

    borderWidth: 1,
    borderRadius: 60,
    borderColor: 'rgba(240, 240, 240, 0.1)',
  },

  charts_container: {
    position: 'absolute',
    right: 0,
    bottom: -208,
    height: 256,
  },
})
