import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from '../../components/TopBarGeneric'
import { MaterialIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import ProgressIndicator from '../../components/ProgressIndicator'
import { getGenres } from '../../utils/requests'
import NavigationButton from '../../components/NavigationButton'
import { Checkbox as CheckboxType } from '../../interfaces/checkbox'
import { FlatList } from 'react-native-gesture-handler'
import Checkbox from 'expo-checkbox'
import { useGenres } from '../../utils/genreFilteringContext'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import UtilsStyle from '../../styles/utils'
import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import { theme_accent, theme_errors, theme_main } from '../../styles/colors'

export default () => {
  const [input, setInput] = useState<string>()
  const [rerender, setRerender] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [pressed, setPressed] = useState<boolean>()
  const [originalGenres, setOriginalGenres] = useState<CheckboxType[]>([])
  const [filteredGenres, setFilteredGenres] = useState<CheckboxType[]>([])
  const [checkedGenres, setCheckedGenres] = useState<CheckboxType[]>([])

  const { genres, setGenres } = useGenres()
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

  useEffect(() => {
    getGenres().then((g) => {
      var array: CheckboxType[] = []
      array = g.data
      array.forEach((c) => {
        c.checked = false
      })
      setFilteredGenres(array)
      setOriginalGenres(array)
    })
  }, [])

  useEffect(() => {
    if (filteredGenres.length >= 1) {
      // restore context if user has selected platforms before
      if (genres && genres.length >= 1 && !pressed) {
        setPressed(true)
        var ga = [...genres]
        var og = [...originalGenres]
        var fg = [...filteredGenres]
        setCheckedGenres(ga.sort((a, b) => a.name.localeCompare(b.name)))

        ga.forEach((genre) => {
          var index = fg.findIndex((g) => g.id == genre.id)
          fg.splice(index, 1)
          index = og.findIndex((g) => g.id == genre.id)
          og[index].checked = true
        })
        setFilteredGenres(fg.sort((a, b) => a.name.localeCompare(b.name)))
        setOriginalGenres(og.sort((a, b) => a.name.localeCompare(b.name)))
        checkSelection()
        refresh()
      }
    }
  }, [originalGenres])

  useEffect(() => {
    checkSelection()
    if (error === '' && checkedGenres.length >= 1) {
      setGenres(checkedGenres)
      navigate('FilteringGames')
    }
  }, [pressed])

  useEffect(() => {
    if (checkedGenres.length >= 1) {
      setGenres(checkedGenres)
    }
  }, [checkedGenres])

  useEffect(() => {
    if (input) {
      var ga: CheckboxType[] = []
      originalGenres.forEach((genre) => {
        if (
          !checkedGenres.some((g) => g.id == genre.id) &&
          genre.name.toLowerCase().includes(input.toLowerCase())
        ) {
          ga.push(genre)
        }
      })
      setFilteredGenres(ga)
    } else {
      var ga: CheckboxType[] = []
      originalGenres.forEach((genre) => {
        if (!checkedGenres.some((g) => g.id == genre.id)) {
          ga.push(genre)
        }
      })
      setFilteredGenres(ga)
    }
  }, [input])

  const handleCheckbox = (id: number) => {
    if (originalGenres) {
      var ga = [...originalGenres]
      var index = originalGenres.findIndex((g) => g.id == id)
      var genre = ga[index]
      genre.checked = !genre.checked
      if (genre.checked) {
        setCheckedGenres((checkedGenres) =>
          [...checkedGenres, genre].sort((a, b) =>
            a.name.localeCompare(b.name),
          ),
        )

        var array = [...filteredGenres]
        var index = array.findIndex((g) => g.id == id)
        array.splice(index, 1)
        setFilteredGenres(array)
      } else {
        var array = [...checkedGenres]
        var index = array.findIndex((g) => g.id == id)
        array.splice(index, 1)
        setCheckedGenres(array)

        setFilteredGenres((filteredGenres) =>
          [...filteredGenres, genre].sort((a, b) =>
            a.name.localeCompare(b.name),
          ),
        )
      }
      setPressed(true)
      checkSelection()
      refresh()
    }
  }

  const refresh = () => {
    setRerender(!rerender)
  }

  const checkSelection = () => {
    if (originalGenres) {
      var choices = originalGenres.filter((g) => g.checked == true)

      if (choices.length < 1 && pressed) {
        setError('Select one or more genres.')
      } else if (pressed) {
        setError('')
      }
    }
  }

  const handlePress = () => {
    setPressed(true)

    if (error === '' && checkedGenres.length >= 1) {
      setGenres(checkedGenres)
      navigate('FilteringGames')
    }
  }

  const renderCheckbox = ({ item }: { item: CheckboxType }) => {
    return (
      <View
        style={[UtilsStyle.flex_row, UtilsStyle.ai_center, UtilsStyle.mb_3]}
        key={item.id}
      >
        <Checkbox
          style={[UtilsStyle.mr_1, { height: 24, width: 24 }]}
          value={item.checked}
          onValueChange={() => handleCheckbox(item.id)}
          color={item.checked ? theme_accent.alpha : undefined}
        />
        <Text
          onPress={() => handleCheckbox(item.id)}
          numberOfLines={2}
          style={[TextStyle.body, { width: 144 }]}
        >
          {item.name}
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <View style={[UtilsStyle.full_size, UtilsStyle.p_2]}>
        <TopBar text="Advanced Search" />
        <View style={(UtilsStyle.full_size, UtilsStyle.p_1)}>
          <View style={[{ height: 136 }]}>
            <View style={[UtilsStyle.mb_2, UtilsStyle.mt_2]}>
              <ProgressIndicator position={1} />
            </View>
            <Text style={[TextStyle.sub_title, UtilsStyle.mb_2]}>
              Choose at least one genre
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
            data={filteredGenres}
            ListHeaderComponent={
              <FlatList
                data={checkedGenres}
                renderItem={renderCheckbox}
                extraData={rerender}
                numColumns={2}
              />
            }
            renderItem={renderCheckbox}
            extraData={rerender}
            numColumns={2}
            style={[{ height: 424 }, error ? UtilsStyle.mb_1 : UtilsStyle.mb_4]}
          />
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
          <NavigationButton
            text="Continue"
            style="square"
            action={() => handlePress()}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
