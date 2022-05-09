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
import { searchForGamesByQuery } from '../../utils/requests'
import CardLarge from '../../components/CardLarge'
import ModalFiltering from '../../components/ModalSorting'
import {
  convertSortingString,
  findGameRecommendations,
  sortLocally,
} from '../../utils/dataprocessing'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import UtilsStyle from '../../styles/utils'
import { theme_main } from '../../styles/colors'
import { useGames } from '../../utils/gameFilteringContext'
import { GameCheckbox } from '../../interfaces/gameCheckbox'
import { usePlatforms } from '../../utils/platformFilterContext'
import { Checkbox } from '../../interfaces/checkbox'

const renderGame = ({ item }: { item: Game }) => {
  return <CardLarge game={item} key={item.id} />
}

export default () => {
  const [recommendedGames, setRecommendedGames] = useState<Game[]>([])
  const [searchData, setSearchData] = useState<Game[]>([])
  const [input, setInput] = useState<string>()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [sortingString, setSortingString] = useState<string>('Relevance')
  const [asc, setAsc] = useState<boolean>(true)
  const [rerender, setRerender] = useState<boolean>(false)

  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()
  const { games, setGames } = useGames()
  const { platforms, setPlatforms } = usePlatforms()

  useEffect(() => {
    if (games.length >= 3) {
      var ga = games
      var pa = platforms
      var convertedGames: Game[] = []
      var convertedPlatforms: number[] = []

      ga.forEach((g: GameCheckbox) => {
        convertedGames.push(g.object)
      })
      pa.forEach((p: Checkbox) => {
        convertedPlatforms.push(p.id)
      })

      searchForGamesByQuery(
        findGameRecommendations(convertedPlatforms, convertedGames),
      ).then((r) => {
        setRecommendedGames(r.data)
        setSearchData(r.data)
      })
    } else {
      searchForGamesByQuery(
        convertSortingString(sortingString, input, asc),
      ).then((r) => {
        setSearchData(r.data)
      })
    }
  }, [games])

  useEffect(() => {
    refresh()
  }, [searchData])

  useEffect(() => {
    if (games.length < 3) {
      const timeOutId = setTimeout(
        () =>
          searchForGamesByQuery(
            convertSortingString(sortingString, input, asc),
          ).then((r) => {
            setSearchData(r.data)
          }),
        1000,
      )
      return () => clearTimeout(timeOutId)
    } else {
      if (input) {
        setSearchData(
          recommendedGames.filter((g) =>
            g.name.toLowerCase().includes(input.toLowerCase()),
          ),
        )
      } else {
        setSearchData(recommendedGames)
      }
    }
  }, [input])

  useEffect(() => {
    if (games.length < 3) {
      searchForGamesByQuery(
        convertSortingString(sortingString, input, asc),
      ).then((r) => {
        setSearchData(r.data)
      })
    } else {
      setSearchData(sortLocally(searchData, sortingString, asc))
    }
  }, [sortingString, asc])

  const refresh = () => {
    setRerender(!rerender)
  }

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
            <TouchableOpacity onPress={() => navigate('FilteringPlatforms')}>
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
            extraData={rerender}
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
