import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import CardLarge from '../../components/card_large'

import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import UtilsStyle from '../../styles/utils'

const testArray = [
  {
    id: 1,
    name: 'Elden Ring',
    genre: 'Role-playing (RPG)',
    rating: 97,
    developer: 'FromSoftware',
  },
  {
    id: 2,
    name: 'Elden Ring',
    genre: 'Role-playing (RPG)',
    rating: 97,
    developer: 'FromSoftware',
  },
  {
    id: 3,
    name: 'Elden Ring',
    genre: 'Role-playing (RPG)',
    rating: 97,
    developer: 'FromSoftware',
  },
  {
    id: 4,
    name: 'Elden Ring',
    genre: 'Role-playing (RPG)',
    rating: 97,
    developer: 'FromSoftware',
  },
  {
    id: 5,
    name: 'Elden Ring',
    genre: 'Role-playing (RPG)',
    rating: 97,
    developer: 'FromSoftware',
  },
]

const renderGame = ({ item }: { item: any }) => {
  return <CardLarge game={item} key={item.id} />
}

export default () => {
  return (
    <SafeAreaView
      style={[
        CoreStyle.background_dark,
        UtilsStyle.full_size,
        CoreStyle.main_container,
      ]}
    >
      <Text style={[TextStyle.title, UtilsStyle.mb_3]}>
        Popular games {'\n'}right now
      </Text>
      <FlatList data={testArray} renderItem={renderGame} />
    </SafeAreaView>
  )
}
