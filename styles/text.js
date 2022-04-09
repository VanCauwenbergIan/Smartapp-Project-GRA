import { StyleSheet } from 'react-native'
import { theme_main, theme_accent } from './colors'

export default StyleSheet.create({
  title: {
    color: theme_main.xx_light,
    fontSize: 28,
  },

  sub_title: {
    color: theme_main.xx_light,
    fontSize: 20,
  },

  body: {
    color: theme_main.light,
    fontSize: 16,
  },

  card_l_main: {
    color: theme_main.xx_light,
    fontSize: 20,
  },

  card_l_sub: {
    color: theme_main.light,
    fontSize: 16,
  },

  card_m_main: {
    color: theme_main.xx_light,
    fontSize: 12,
  },

  card_m_sub: {
    color: theme_accent.alpha_light,
    fontSize: 12,
  },
})
