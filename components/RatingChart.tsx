import { Text, View } from 'react-native'
import Svg, { Circle, G } from 'react-native-svg'
import Game from '../interfaces/game'
import { theme_main } from '../styles/colors'
import { getColorRating } from '../utils/colorRating'

import UtilsStyle from '../styles/utils'
import TextStyle from '../styles/text'
import CoreStyle from '../styles/core'

export default ({ rating, type }: { rating?: number; type: string }) => {
  let size

  if (type == 'critic') {
    size = 80
  } else {
    size = 100
  }

  const r = size / 2 - 4

  const c = 2 * Math.PI * r

  if (rating) {
    const p = Math.round(rating)
    const v = c - c * (p / 100) + 8
    const sda = (c - v).toString() + ', ' + v.toString()

    return (
      <View
        style={[
          size > 80
            ? [UtilsStyle.center_content, CoreStyle.chart_backdrop_lg]
            : [UtilsStyle.center_content, CoreStyle.chart_backdrop_sm],
          { marginRight: -4 },
        ]}
      >
        <View style={UtilsStyle.center_content}>
          <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
            <G rotation={-90} originX={size / 2} originY={size / 2}>
              <Circle
                cx="50%"
                cy="50%"
                r={r}
                stroke={theme_main.xx_dark}
                fill="transparent"
                strokeWidth="8"
              />
              <Circle
                cx="50%"
                cy="50%"
                r={r}
                stroke={getColorRating(rating)[1]}
                fill="transparent"
                strokeWidth="8"
                strokeDasharray={sda}
                strokeLinecap="square"
              />
            </G>
          </Svg>
        </View>
        <View style={[{ position: 'absolute' }, UtilsStyle.center_content]}>
          <Text style={[TextStyle.title, TextStyle.card_pv_main]}>{p}</Text>
          {type !== 'critic' ? (
            <Text
              style={[
                TextStyle.card_m_main,
                { color: getColorRating(rating)[1] },
              ]}
            >
              {getColorRating(rating)[0]}
            </Text>
          ) : null}
        </View>
      </View>
    )
  } else {
    return (
      <View
        style={[
          size > 80
            ? [UtilsStyle.center_content, CoreStyle.chart_backdrop_lg]
            : [UtilsStyle.center_content, CoreStyle.chart_backdrop_sm],
          { marginRight: -4 },
        ]}
      >
        <View style={UtilsStyle.center_content}>
          <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
            <G rotation={-90} originX={size / 2} originY={size / 2}>
              <Circle
                cx="50%"
                cy="50%"
                r={r}
                stroke={theme_main.dark}
                fill="transparent"
                strokeWidth="8"
              />
            </G>
          </Svg>
        </View>
        <View style={[{ position: 'absolute' }, UtilsStyle.center_content]}>
          <Text style={[TextStyle.title, TextStyle.card_pv_main]}>N/A</Text>
        </View>
      </View>
    )
  }
}
