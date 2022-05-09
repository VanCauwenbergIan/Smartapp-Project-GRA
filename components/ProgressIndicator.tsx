import { View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { theme_accent, theme_main } from '../styles/colors'

import UtilsStyle from '../styles/utils'
import TextStyle from '../styles/text'
import CoreStyle from '../styles/core'

export default ({
  total = 3,
  position,
}: {
  total?: Number
  position: Number
}) => {
  return (
    <View style={UtilsStyle.flex_row}>
      {[
        [...Array(total)].map((e, i) => (
          <Svg
            height={8}
            width={8}
            viewBox={`0 0 8 8`}
            key={i}
            style={UtilsStyle.mr_1}
          >
            <Circle
              cx="50%"
              cy="50%"
              r={4}
              fill={i == position ? theme_accent.alpha : theme_main.dark}
            />
          </Svg>
        )),
      ]}
    </View>
  )
}
