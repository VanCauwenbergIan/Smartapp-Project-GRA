import { StyleSheet } from 'react-native'
import { theme_main } from './colors'

const baseline = 8

export default StyleSheet.create({
  center_content: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  center_content_v: {
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

  space_evenly: { justifyContent: 'space-evenly' },

  space_around: { justifyContent: 'space-around' },

  jc_flex_end: {
    justifyContent: 'flex-end',
  },

  jc_center: {
    justifyContent: 'center',
  },

  ai_flex_end: {
    alignItems: 'flex-end',
  },

  flex_start: {
    justifyContent: 'flex-start',
  },

  wrap_around: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  full_size: {
    flexGrow: 1,
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

  mb_4: {
    marginBottom: baseline * 4,
  },

  mb_5: {
    marginBottom: baseline * 5,
  },

  mt_1: {
    marginTop: baseline * 1,
  },

  mt_2: {
    marginTop: baseline * 2,
  },

  mt_3: {
    marginTop: baseline * 3,
  },

  mt_4: {
    marginTop: baseline * 4,
  },

  mt_5: {
    marginTop: baseline * 5,
  },

  mr_1: {
    marginRight: baseline * 1,
  },

  mr_2: {
    marginRight: baseline * 2,
  },

  mr_3: {
    marginRight: baseline * 3,
  },

  mr_4: {
    marginRight: baseline * 4,
  },

  mr_5: {
    marginRight: baseline * 5,
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

  p_2: {
    padding: baseline * 2,
  },

  p_3: {
    padding: baseline * 3,
  },

  p_4: {
    padding: baseline * 4,
  },

  p_5: {
    padding: baseline * 5,
  },

  text_align_v: {
    textAlignVertical: 'center',
  },

  underline: {
    textDecorationLine: 'underline',
  },

  o_50: {
    opacity: 0.5,
  },
})
