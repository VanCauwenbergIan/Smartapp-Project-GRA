import { StyleSheet } from 'react-native'

const baseline = 8

export default StyleSheet.create({
  center_content: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  full_size: {
    width: '100%',
    height: '100%',
  },

  flex_row: {
    flex: 1,
    flexDirection: 'row',
  },

  w_50: {
    width: '50%',
  },

  mb_1: {
    marginBottom: baseline * 1,
  },

  mb_2: {
    marginBottom: baseline * 2,
  },

  mb_3: {
    marginBottom: baseline * 3,
  },

  p_1: {
    padding: baseline * 1,
  },

  text_bold: {
    fontWeight: 'bold',
  },

  text_italic: {
    fontStyle: 'italic',
  },
})
