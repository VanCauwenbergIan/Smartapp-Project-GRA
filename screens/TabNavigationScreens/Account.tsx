import { Keyboard, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'
import Game from '../../interfaces/game'
import CardFavorite from '../../components/CardFavorite'
import { app, auth } from '../../utils/firebase'

import { favorites_test } from '../../utils/requests'

import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import UtilsStyle from '../../styles/utils'
import { theme_main } from '../../styles/colors'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useFavorites } from '../../utils/favoritesContext'
import { useEffect, useState } from 'react'
import { database } from '../../utils/database'
import { searchList } from '../../utils/dataprocessing'

const renderGame = ({ item }: { item: Game }) => {
  return <CardFavorite game={item} key={item.id} />
}

export default () => {
  const { setFavorites, favorites } = useFavorites()
  const [data, setData] = useState<Game[]>(favorites)
  const [rerender, setRerender] = useState<boolean>(false)
  const [input, setInput] = useState<string>()
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

  const logout = () => {
    auth.signOut()
    auth.updateCurrentUser(null)
    navigate('Login')
  }

  // force a rerender of the flatlist
  const refresh = () => {
    setRerender(!rerender)
    if (input) {
      var result = searchList(favorites, input)
      setData(result)
    } else {
      setData(favorites)
    }
  }

  useEffect(() => {
    if (input) {
      var result = searchList(favorites, input)
      setData(result)
    } else {
      setData(favorites)
    }
  }, [input])

  return (
    <SafeAreaView
      style={[
        CoreStyle.background_dark,
        UtilsStyle.full_size,
        CoreStyle.main_container,
      ]}
    >
      <View style={CoreStyle.topbar_account}>
        <View
          style={[
            UtilsStyle.flex_row,
            UtilsStyle.space_between,
            UtilsStyle.center_content_v,
            UtilsStyle.mb_1,
          ]}
        >
          <Text style={TextStyle.title}>{auth.currentUser?.displayName}</Text>
          <MaterialIcons name="edit" color={theme_main.xx_light} size={32} />
        </View>
        <View style={[UtilsStyle.flex_row, UtilsStyle.ml_1, UtilsStyle.mb_3]}>
          <Text numberOfLines={1} style={TextStyle.sub_title}>
            {auth.currentUser?.email}
          </Text>
        </View>
        <TouchableOpacity onPress={logout}>
          <Text
            style={[
              TextStyle.sub_title,
              CoreStyle.color_accent,
              UtilsStyle.mb_4,
            ]}
          >
            Log out
          </Text>
        </TouchableOpacity>
        <View
          style={[
            UtilsStyle.flex_row,
            UtilsStyle.space_between,
            UtilsStyle.mb_3,
          ]}
        >
          <Text style={[TextStyle.sub_title, UtilsStyle.mr_4]}>Favorites</Text>
          <View
            style={[
              UtilsStyle.flex_row,
              CoreStyle.searchbar,
              UtilsStyle.mb_3,
              UtilsStyle.full_size,
            ]}
          >
            <MaterialIcons
              style={UtilsStyle.mr_1}
              name="search"
              color={theme_main.light}
              size={24}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor={theme_main.light}
              style={[TextStyle.body, { width: 172 }]}
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
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 232 }}
        data={data}
        onTouchEnd={() => refresh()}
        extraData={rerender}
        renderItem={renderGame}
      />
    </SafeAreaView>
  )
}
