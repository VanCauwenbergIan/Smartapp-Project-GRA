import { StyleSheet } from 'react-native'
import { theme_main, theme_accent } from './colors'

const mainFont = 'Roboto-Regular'
const mainFontBold = 'Roboto-Medium'
const mainFontBoldItalic = 'Roboto-MediumItalic'

const secFont = 'Poppins-Regular'
const secFontBold = 'Poppins-Medium'

export default StyleSheet.create({
  title: {
    fontFamily: secFont,
    color: theme_main.xx_light,
    fontSize: 28,
  },

  sub_title: {
    fontFamily: mainFontBold,
    color: theme_main.xx_light,
    fontSize: 20,
  },

  body: {
    fontFamily: mainFont,
    color: theme_main.light,
    fontSize: 16,
  },

  card_l_main: {
    fontFamily: mainFont,
    color: theme_main.xx_light,
    fontSize: 20,
  },

  card_l_dev: {
    fontFamily: mainFontBoldItalic,
  },

  card_m_main: {
    fontFamily: mainFont,
    color: theme_main.xx_light,
    fontSize: 12,
  },

  card_m_sub: {
    fontFamily: mainFont,
    color: theme_accent.alpha_light,
    fontSize: 12,
  },

  card_f_main: {
    fontFamily: mainFont,
    color: theme_main.xx_light,
    fontSize: 22,
  },

  card_pv_main: {
    fontFamily: mainFontBold,
  },

  li: {
    fontFamily: mainFont,
    color: theme_accent.alpha_light,
    fontSize: 16,

    borderRightWidth: 1,
    borderRightColor: theme_main.dark,
    paddingBottom: 16,
    paddingLeft: 8,
  },

  theme: {
    fontFamily: mainFontBold
  }
})
