import { StyleSheet } from 'react-native'
import { theme_main, theme_accent } from './colors'

export default StyleSheet.create({
  background_dark: {
    backgroundColor: theme_main.xx_dark,
  },

  background_light: {
    backgroundColor: theme_main.x_dark,
  },

  color_accent: { color: theme_accent.alpha_light },

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

  searchbar: {
    backgroundColor: theme_main.dark,
    height: 32,

    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  topbar_explore: {
    flex: 1,
    flexBasis: 200,
    flexGrow: 0,
  },

  topbar_account: {
    flex: 1,
    flexBasis: 224,
    flexGrow: 0,
  },

  inputfield: {
    fontSize: 20,
    backgroundColor: theme_main.dark,
    borderRadius: 10,
    padding: 12,
    color: theme_main.xx_light,
  },

  modal: {
    position: 'absolute',
    top: 0,
    paddingTop: 48,

    height: '100%',
    width: '100%',
  },

  modal_child: {
    backgroundColor: theme_main.dark,
    width: '75%',

    borderRadius: 10,

    shadowColor: theme_main.xxx_dark,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
})
