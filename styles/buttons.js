import { StyleSheet } from 'react-native'
import { theme_main } from './colors'

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
    borderRadius: 10
  },
})
