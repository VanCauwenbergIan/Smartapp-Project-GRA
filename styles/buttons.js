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

  card_pv_lg: {
    height: 152,
    width: 152,

    borderRadius: 5,
  },

  card_pv_sm: {
    width: 152,
    height: 72,

    borderRadius: 5,
  },

  card_pv_textbox: {
    position: 'absolute',
    bottom: 16,
    maxWidth: 144,

    paddingHorizontal: 8,
    backgroundColor: 'rgba(24, 29, 35, 0.5)',
  },

  theme_tag: {
    alignSelf: 'center',

    borderWidth: 1,
    borderColor: theme_accent.alpha_dark,
    borderRadius: 5,
  },

  button_standard: {
    padding: 16,
    borderRadius: 50,
    backgroundColor: theme_accent.alpha,
  },

  button_square: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: theme_accent.alpha,
  },

  button_alternate: {
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme_main.dark,
    height: 56,
    flexGrow: 1,
    flexDirection: 'row',
  },

  button_sorting: {
    height: 44,

    borderBottomColor: theme_main.light,
    borderBottomWidth: 1,
  },
})
