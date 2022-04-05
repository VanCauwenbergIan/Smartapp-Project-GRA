import { theme_indicator } from '../styles/colors'

export const getColorRating = (r: number) => {
  if (r < 10) {
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
  }
}
