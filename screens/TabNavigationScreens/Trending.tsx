import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import CardLarge from '../../components/CardLarge'
import { useEffect, useState } from 'react'
import { getPopularGames } from '../../utils/requests'
import Game from '../../interfaces/game'
import AppLoading from 'expo-app-loading'

import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import UtilsStyle from '../../styles/utils'

const renderGame = ({ item }: { item: Game }) => {
  return <CardLarge game={item} key={item.id} />
}

export default () => {
  const [popGames, setPopGames] = useState<Game[]>()

  useEffect(() => {
    getPopularGames().then((r) => {
      setPopGames(r.data)
    })
  }, [])

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
      <FlatList data={popGames} renderItem={renderGame} />
    </SafeAreaView>
  )
}
