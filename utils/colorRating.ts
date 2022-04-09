import {theme_main } from '../styles/colors'

export const theme_indicator = {
  0: ['Awful', '#E23131'],
  10: ['Very Bad', '#E55234'],
  20: ['Bad', '#E87336'],
  30: ['Unimpressive', '#EB9439'],
  40: ['Mediocre', '#EEB53B'],
  50: ['Fair', '#CDB64B'],
  60: ['Alright', '#ACB75B'],
  70: ['Good', '#8CB96A'],
  80: ['Great', '#6BBA7A'],
  90: ['Superb', '#4ABB8A'],
}

export const getColorRating = (r: number): string[] => {
  if (0 < r && r < 10) {
    return theme_indicator[0]
  } else if (r < 20) {
    return theme_indicator[10]
  } else if (r < 30) {
    return theme_indicator[20]
  } else if (r < 40) {
    return theme_indicator[30]
  } else if (r < 50) {
    return theme_indicator[40]
  } else if (r < 60) {
    return theme_indicator[50]
  } else if (r < 70) {
    return theme_indicator[60]
  } else if (r < 80) {
    return theme_indicator[70]
  } else if (r < 90) {
    return theme_indicator[80]
  } else if (r < 100) {
    return theme_indicator[90]
  } else {
    return ['No rating', theme_main.light]
  }
}
