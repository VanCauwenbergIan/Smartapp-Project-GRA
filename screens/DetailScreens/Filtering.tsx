import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from '../../components/TopBarGeneric'
import { MaterialIcons } from '@expo/vector-icons'

import UtilsStyle from '../../styles/utils'
import TextStyle from '../../styles/text'
import CoreStyle from '../../styles/core'
import { theme_accent, theme_errors, theme_main } from '../../styles/colors'
import { useEffect, useState } from 'react'
import ProgressIndicator from '../../components/ProgressIndicator'
import { getPlatforms } from '../../utils/requests'
import Name from '../../interfaces/name'
import NavigationButton from '../../components/NavigationButton'
import { Checkbox as CheckboxType } from '../../interfaces/checkbox'
import { FlatList } from 'react-native-gesture-handler'
import Checkbox from 'expo-checkbox'

export default () => {
  const [input, setInput] = useState<string>()
  const [rerender, setRerender] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [pressed, setPressed] = useState<boolean>()
  const [platforms, setPlatforms] = useState<CheckboxType[]>([])
  const [filteredPlatforms, setFilteredPlatforms] = useState<CheckboxType[]>([])
  const [checkedPlatforms, setCheckedPlatforms] = useState<CheckboxType[]>([])

  useEffect(() => {
    getPlatforms().then((r) => {
      var array: CheckboxType[] = []
      array = r.data
      array.forEach((c) => {
        c.checked = false
      })
      setPlatforms(array)
      setFilteredPlatforms(array)
    })
  }, [])

  useEffect(() => {
    checkSelection()
    if (error === '' && pressed) {
      console.log('OK 2')
      console.log(checkedPlatforms)
    }
  }, [pressed])

  useEffect(() => {
    if (input) {
      var pa: CheckboxType[] = []
      platforms.forEach((platform) => {
        if (
          !checkedPlatforms.includes(platform) &&
          platform.name.toLowerCase().includes(input.toLowerCase())
        ) {
          pa.push(platform)
        }
      })
      setFilteredPlatforms(pa)
    } else {
      var pa: CheckboxType[] = []
      platforms.forEach((platform) => {
        if (!checkedPlatforms.includes(platform)) {
          pa.push(platform)
        }
      })
      setFilteredPlatforms(pa)
    }
  }, [input])

  const handleCheckbox = (id: number) => {
    if (platforms) {
      var pa = [...platforms]
      var index = platforms.findIndex((p) => p.id == id)
      var platform = pa[index]
      platform.checked = !platform.checked
      if (platform.checked) {
        setCheckedPlatforms((checkedPlatforms) =>
          [...checkedPlatforms, platform].sort((a, b) =>
            a.name.localeCompare(b.name),
          ),
        )

        var array = [...filteredPlatforms]
        var index = array.findIndex((p) => p.id == id)
        array.splice(index, 1)
        setFilteredPlatforms(array)
      } else {
        var array = [...checkedPlatforms]
        var index = array.findIndex((p) => p.id == id)
        array.splice(index, 1)
        setCheckedPlatforms(array)

        setFilteredPlatforms((filteredPlatforms) =>
          [...filteredPlatforms, platform].sort((a, b) =>
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
    if (platforms) {
      var choices = platforms.filter((p) => p.checked == true)

      if (choices.length < 1 && pressed) {
        setError('Select one or more platforms.')
      } else if (pressed) {
        setError('')
      }
    }
  }

  const handlePress = () => {
    setPressed(true)

    if (error === '' && pressed) {
      console.log('OK 1')
      console.log(checkedPlatforms)
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
              <ProgressIndicator position={0} />
            </View>
            <Text style={[TextStyle.sub_title, UtilsStyle.mb_2]}>
              Choose your platform(s)
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
            data={filteredPlatforms}
            ListHeaderComponent={
              <FlatList
                data={checkedPlatforms}
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
