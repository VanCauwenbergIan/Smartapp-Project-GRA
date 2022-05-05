import { Keyboard, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
import Game from '../../interfaces/game'
import { getPopularGames, searchForGamesByName } from '../../utils/requests'
import CardLarge from '../../components/CardLarge'

import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import UtilsStyle from '../../styles/utils'
import { theme_main } from '../../styles/colors'
import ModalFiltering from '../../components/ModalSorting'
import { convertSortingString } from '../../utils/dataprocessing'

const renderGame = ({ item }: { item: Game }) => {
  return <CardLarge game={item} key={item.id} />
}

export default () => {
  const [searchData, setSearchData] = useState<Game[]>()
  const [input, setInput] = useState<string>()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [sortingString, setSortingString] = useState<string>('Relevance')
  const [asc, setAsc] = useState<boolean>(false)

  useEffect(() => {
    const timeOutId = setTimeout(
      () =>
        searchForGamesByName(
          convertSortingString(sortingString, input, asc),
        ).then((r) => {
          setSearchData(r.data)
        }),
      1000,
    )
    return () => clearTimeout(timeOutId)
  }, [input])

  useEffect(() => {
    searchForGamesByName(convertSortingString(sortingString, input, asc)).then(
      (r) => {
        setSearchData(r.data)
      },
    )
  }, [sortingString, asc])

  return (
    <View>
      <ModalFiltering
        show={modalVisible}
        sorting={sortingString}
        dir={asc}
        setShow={setModalVisible}
        setSorting={setSortingString}
        setDir={setAsc}
      />
      <SafeAreaView
        style={[
          CoreStyle.background_dark,
          UtilsStyle.full_size,
          CoreStyle.main_container,
        ]}
      >
        <View style={CoreStyle.topbar_explore}>
          <View
            style={[
              UtilsStyle.flex_row,
              UtilsStyle.space_between,
              UtilsStyle.mb_3,
              UtilsStyle.center_content_v,
            ]}
          >
            <Text style={TextStyle.title}>Explore</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <MaterialIcons
                name="sort"
                color={theme_main.xx_light}
                size={32}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              UtilsStyle.flex_row,
              CoreStyle.searchbar,
              UtilsStyle.mb_3,
              UtilsStyle.center_content_v,
            ]}
          >
            <MaterialIcons
              style={UtilsStyle.mr_2}
              name="search"
              color={theme_main.light}
              size={24}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor={theme_main.light}
              style={[TextStyle.body, { width: 276 }]}
              value={input}
              onChangeText={setInput}
            />
            {input ? (
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss()
                  setInput('')
                }}
              >
                <MaterialIcons
                  style={UtilsStyle.ml_1}
                  name="close"
                  color={theme_main.light}
                  size={24}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={[
              UtilsStyle.flex_row,
              UtilsStyle.space_between,
              UtilsStyle.mb_4,
              UtilsStyle.center_content_v,
            ]}
          >
            <Text style={TextStyle.sub_title}>Let us help you!</Text>
            <TouchableOpacity>
              <Text style={[TextStyle.body, CoreStyle.color_accent]}>
                recommend me games
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {searchData && searchData.length >= 1 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={UtilsStyle.full_size}
            contentContainerStyle={{ paddingBottom: 404 }}
            data={searchData}
            renderItem={renderGame}
          />
        ) : (
          <Text style={TextStyle.body}>
            {input ? `We couldn't find anything for '${input}'` : ''}
          </Text>
        )}
      </SafeAreaView>
    </View>
  )
}
