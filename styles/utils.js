import { StyleSheet } from 'react-native'

const baseline = 8

export default StyleSheet.create({
  center_content: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  flex_row: {
    flex: 1,
    flexDirection: 'row',
  },

  flex_column: {
    flex: 1,
    flexDirection: 'column',
  },

  space_between: {
    justifyContent: 'space-between',
  },

  full_size: {
    width: '100%',
    height: '100%',
  },

  w_50: {
    width: '50%',
  },

  h_15: {
    height: '15%',
  },

  h_50: {
    height: '50%',
  },

  h_85: {
    height: '85%',
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

  mr_1: {
    marginRight: baseline * 1,
  },

  mr_2: {
    marginRight: baseline * 2,
  },

  ml_1: {
    marginLeft: baseline * 1,
  },

  ml_2: {
    marginLeft: baseline * 2,
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

  text_align_v: {
    textAlignVertical: 'center',
  },
})
