import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import Game from '../../interfaces/game'
import { getAnticipatedGames, getNewReleases } from '../../utils/requests'
import { FlatList } from 'react-native-gesture-handler'
import CardMedium from '../../components/card_medium'
import CardLV from '../../components/card_listview'

import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import UtilsStyle from '../../styles/utils'

const renderGameH = ({ item }: { item: Game }) => {
  return <CardMedium game={item} key={item.id} />
}

const renderGameV = ({ item }: { item: Game }) => {
  return <CardLV game={item} key={item.id} />
}

export default () => {
  const [antGames, setAntGames] = useState<Game[]>()
  const [newGames, setNewGames] = useState<Game[]>()

  useEffect(() => {
    getAnticipatedGames().then((r) => {
      setAntGames(r.data)
    })
    getNewReleases().then((r) => {
      setNewGames(r.data)
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
      <Text style={[TextStyle.title, UtilsStyle.mb_3]}>Release Radar</Text>
      <Text
        style={[TextStyle.sub_title, UtilsStyle.text_bold, UtilsStyle.mb_3]}
      >
        Most anticipated
      </Text>
      <View style={UtilsStyle.mb_3}>
        <FlatList horizontal={true} data={antGames} renderItem={renderGameH} />
      </View>
      <Text
        style={[TextStyle.sub_title, UtilsStyle.text_bold, UtilsStyle.mb_2]}
      >
        Newest releases
      </Text>
      <View>
        <FlatList
          contentContainerStyle={{ paddingBottom: 64 }}
          data={newGames}
          renderItem={renderGameV}
        />
      </View>
    </SafeAreaView>
  )
}
