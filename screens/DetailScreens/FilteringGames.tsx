import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from '../../components/TopBarGeneric'
import ProgressIndicator from '../../components/ProgressIndicator'
import { MaterialIcons } from '@expo/vector-icons'

import UtilsStyle from '../../styles/utils'
import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import { theme_accent, theme_errors, theme_main } from '../../styles/colors'
import NavigationButton from '../../components/NavigationButton'
import { useEffect, useState } from 'react'
import { GameCheckbox as GameCheckboxType } from '../../interfaces/gameCheckbox'
import CardCheckbox from '../../components/CardCheckbox'
import { searchForGamesByQuery } from '../../utils/requests'
import { platformAndGenresToQuery } from '../../utils/dataprocessing'
import { usePlatforms } from '../../utils/platformFilterContext'
import { useGenres } from '../../utils/genreFilteringContext'
import { useGames } from '../../utils/gameFilteringContext'
import Game from '../../interfaces/game'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export default () => {
  const [input, setInput] = useState<string>()
  const [rerender, setRerender] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [pressed, setPressed] = useState<boolean>()
  const [originalGames, setOriginalGames] = useState<GameCheckboxType[]>([])
  const [filteredGames, setFilteredGames] = useState<GameCheckboxType[]>([])
  const [checkedGames, setCheckedGames] = useState<GameCheckboxType[]>([])

  const { platforms, setPlatforms } = usePlatforms()
  const { genres, setGenres } = useGenres()
  const { games, setGames } = useGames()
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

  useEffect(() => {
    var platformIds: number[] = []
    var genreIds: number[] = []

    platforms.forEach((p) => {
      platformIds.push(p.id)
    })
    genres.forEach((g) => {
      genreIds.push(g.id)
    })
    searchForGamesByQuery(platformAndGenresToQuery(platformIds, genreIds)).then(
      (r) => {
        var games: Game[] = r.data
        var result: GameCheckboxType[] = []
        games.forEach((g) => {
          var game: GameCheckboxType = {
            key: 0,
            object: { id: 0, cover: { id: 0, image_id: '' }, name: '' },
            checked: false,
          }
          game.key = g.id
          game.object = g
          result.push(game)
        })
        setFilteredGames(result)
        setOriginalGames(result)
      },
    )
  }, [])

  useEffect(() => {
    if (filteredGames.length >= 1) {
      if (games && games.length >= 3 && !pressed) {
        setPressed(true)
        var ga = [...games]
        var og = [...originalGames]
        var fg = [...filteredGames]
        var addToOg: GameCheckboxType[] = []
        setCheckedGames(
          ga
            .sort(
              (a, b) =>
                (a.object.first_release_date
                  ? a.object.first_release_date
                  : 0) -
                (b.object.first_release_date ? b.object.first_release_date : 0),
            )
            .reverse(),
        )
        ga.forEach((game) => {
          game.checked = true
          var index = fg.findIndex((g) => g.object.id == game.object.id)
          if (index >= 0) {
            fg.splice(index, 1)
          }
          index = og.findIndex((g) => g.object.id == game.object.id)
          if (index >= 0) {
            og[index].checked = true
          } else {
            if (
              !originalGames.some((ogame) => ogame.object.id == game.object.id)
            )
              addToOg.push(game)
          }
        })
        setOriginalGames((originalGames) =>
          [...originalGames, ...addToOg]
            .sort(
              (a, b) =>
                (a.object.first_release_date
                  ? a.object.first_release_date
                  : 0) -
                (b.object.first_release_date ? b.object.first_release_date : 0),
            )
            .reverse(),
        )
        setFilteredGames(
          fg
            .sort(
              (a, b) =>
                (a.object.first_release_date
                  ? a.object.first_release_date
                  : 0) -
                (b.object.first_release_date ? b.object.first_release_date : 0),
            )
            .reverse(),
        )
        checkSelection()
      }
      refresh()
    }
  }, [originalGames])

  useEffect(() => {
    checkSelection()
    if (error === '' && checkedGames.length >= 3) {
      setGames(checkedGames)
      navigate('Tab')
    }
  }, [pressed])

  useEffect(() => {
    if (checkedGames.length >= 3) {
      setGames(checkedGames)
    }
  }, [checkedGames])

  useEffect(() => {
    var platformIds: number[] = []
    var genreIds: number[] = []

    platforms.forEach((p) => {
      platformIds.push(p.id)
    })
    genres.forEach((g) => {
      genreIds.push(g.id)
    })

    if (input) {
      searchForGamesByQuery(
        platformAndGenresToQuery(platformIds, genreIds, input),
      ).then((r) => {
        var games: Game[] = r.data
        var result: GameCheckboxType[] = []
        var addToOg: GameCheckboxType[] = []
        games.forEach((g) => {
          var game: GameCheckboxType = {
            key: 0,
            object: { id: 0, cover: { id: 0, image_id: '' }, name: '' },
            checked: false,
          }
          game.key = g.id
          game.object = g
          if (
            !checkedGames.some(
              (checkedGame) => checkedGame.object.id == game.object.id,
            )
          ) {
            result.push(game)
          }

          if (!originalGames.some((og) => og.object.id == game.object.id)) {
            addToOg.push(game)
          }
        })
        setFilteredGames(result)
        setOriginalGames((originalGames) =>
          [...originalGames, ...addToOg]
            .sort(
              (a, b) =>
                (a.object.first_release_date
                  ? a.object.first_release_date
                  : 0) -
                (b.object.first_release_date ? b.object.first_release_date : 0),
            )
            .reverse(),
        )
      })
    } else {
      searchForGamesByQuery(
        platformAndGenresToQuery(platformIds, genreIds),
      ).then((r) => {
        var games: Game[] = r.data
        var result: GameCheckboxType[] = []
        var addToOg: GameCheckboxType[] = []
        games.forEach((g) => {
          var game: GameCheckboxType = {
            key: 0,
            object: { id: 0, cover: { id: 0, image_id: '' }, name: '' },
            checked: false,
          }
          game.key = g.id
          game.object = g
          if (
            !checkedGames.some(
              (checkedGame) => checkedGame.object.id == game.object.id,
            )
          ) {
            result.push(game)
          }

          if (!originalGames.some((og) => og.object.id == game.object.id)) {
            addToOg.push(game)
          }
        })
        setFilteredGames(result)
        setOriginalGames((originalGames) =>
          [...originalGames, ...addToOg]
            .sort(
              (a, b) =>
                (a.object.first_release_date
                  ? a.object.first_release_date
                  : 0) -
                (b.object.first_release_date ? b.object.first_release_date : 0),
            )
            .reverse(),
        )
      })
    }
  }, [input])

  const handleCheckbox = (id: number) => {
    if (originalGames) {
      var ga = [...originalGames]
      var index = originalGames.findIndex((g) => g.object.id == id)
      console.log(index)
      var game = ga[index]
      game.checked = !game.checked
      if (
        game.checked &&
        !checkedGames.some((cgame) => cgame.object.id == id)
      ) {
        setCheckedGames((checkedGames) =>
          [...checkedGames, game]
            .sort(
              (a, b) =>
                (a.object.first_release_date
                  ? a.object.first_release_date
                  : 0) -
                (b.object.first_release_date ? b.object.first_release_date : 0),
            )
            .reverse(),
        )

        var array = [...filteredGames]
        var index = array.findIndex((g) => g.object.id == id)
        array.splice(index, 1)
        setFilteredGames(array)
      } else if (!filteredGames.some((cgame) => cgame.object.id == id)) {
        var array = [...checkedGames]
        var index = array.findIndex((g) => g.object.id == id)
        array.splice(index, 1)
        setCheckedGames(array)

        setFilteredGames((filteredGames) =>
          [...filteredGames, game]
            .sort(
              (a, b) =>
                (a.object.first_release_date
                  ? a.object.first_release_date
                  : 0) -
                (b.object.first_release_date ? b.object.first_release_date : 0),
            )
            .reverse(),
        )
      }
      setPressed(true)
      checkSelection()
      refresh()
    }
  }

  const handlePress = () => {
    setPressed(true)

    if (error === '' && checkedGames.length >= 3) {
      setGames(checkedGames)
      navigate('Tab')
    }
  }

  const renderGame = ({ item }: { item: GameCheckboxType }) => {
    return (
      <TouchableOpacity onPress={() => handleCheckbox(item.key)}>
        <CardCheckbox gameCheckbox={item} key={item.key} />
      </TouchableOpacity>
    )
  }

  const checkSelection = () => {
    if (originalGames) {
      var choices = originalGames.filter((g) => g.checked == true)

      if (choices.length < 3 && pressed) {
        setError('Select three or more games.')
      } else if (pressed) {
        setError('')
      }
    }
  }

  const refresh = () => {
    setRerender(!rerender)
  }

  const clearAll = () => {
    setPlatforms([])
    setGenres([])
    setGames([])
    navigate('Tab')
  }

  return (
    <SafeAreaView>
      <View
        style={[
          UtilsStyle.full_size,
          UtilsStyle.p_2,
          { backgroundColor: 'transparent', overflow: 'visible' },
        ]}
      >
        <TopBar text="Advanced Search" />
        <View style={[UtilsStyle.full_size, UtilsStyle.p_1]}>
          <View style={[{ height: 136 }]}>
            <View style={[UtilsStyle.mb_2, UtilsStyle.mt_2]}>
              <ProgressIndicator position={2} />
            </View>
            <Text style={[TextStyle.sub_title, UtilsStyle.mb_2]}>
              Choose 3 games or more
            </Text>
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
          </View>
          <FlatList
            data={filteredGames}
            ListHeaderComponent={
              <FlatList
                data={checkedGames}
                renderItem={renderGame}
                extraData={rerender}
              />
            }
            showsVerticalScrollIndicator={false}
            renderItem={renderGame}
            extraData={rerender}
            style={[{ height: 424 }, error ? UtilsStyle.mb_1 : UtilsStyle.mb_4]}
            contentContainerStyle={{
              overflow: 'visible',
              paddingTop: 10,
              paddingRight: 10,
              paddingLeft: 10,
            }}
          />
          {/* no choice but to add padding, tried a hunderd different ways of achieving overflow, but android do be like that */}
          {error ? (
            <Text
              style={[
                TextStyle.body,
                UtilsStyle.mb_2,
                { color: theme_errors.error_dark },
              ]}
            >
              {error}
            </Text>
          ) : null}
          <View
            style={[
              UtilsStyle.flex_row,
              { flexBasis: 88 },
              UtilsStyle.space_between,
            ]}
          >
            <View style={{ width: 144, height: 88 }}>
              <NavigationButton
                text="Clear all"
                style="alternate square"
                action={() => clearAll()}
              />
            </View>
            <View style={{ width: 144, height: 88 }}>
              <NavigationButton
                text="Done"
                style="square"
                action={() => handlePress()}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
