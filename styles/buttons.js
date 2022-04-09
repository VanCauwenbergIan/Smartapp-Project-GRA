import { StyleSheet } from 'react-native'
import { theme_accent, theme_main } from './colors'

export default StyleSheet.create({
  central_icon: {
    position: 'absolute',
    bottom: 24,

    width: 60,
    height: 60,
  },

  card_large: {
    height: 216,
    width: '100%',

    backgroundColor: theme_main.x_dark,
    borderRadius: 10,
  },

  card_medium: {
    height: 272,
    width: 190,

    backgroundColor: theme_main.dark,
    borderRadius: 5,
  },

  card_small: {
    height: 176,
    width: 112,

    backgroundColor: theme_main.dark,
    borderRadius: 5,
  },

  cs_textbox: {
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  card_lv: {
    height: 80,
    width: '100%',

    backgroundColor: theme_main.x_dark,
    borderRadius: 5,
  },

  theme_tag: {
    alignSelf: 'center',

    borderWidth: 1,
    borderColor: theme_accent.alpha_dark,
    borderRadius: 5,
  },
})
