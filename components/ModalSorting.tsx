import { BlurView } from 'expo-blur'
import { Modal, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import SortingButton from './SortingButton'

import CoreStyle from '../styles/core'
import TextStyle from '../styles/text'
import UtilsStyle from '../styles/utils'
import { theme_accent, theme_main } from '../styles/colors'

export default ({
  show,
  setShow,
  sorting,
  setSorting,
  dir,
  setDir,
}: {
  show: boolean
  sorting: string
  dir: boolean
  setShow: Function
  setSorting: Function
  setDir: Function
}) => {
  return (
    <Modal transparent visible={show} statusBarTranslucent={true}>
      <BlurView
        intensity={60}
        tint="dark"
        style={[CoreStyle.modal, UtilsStyle.center_content]}
      >
        <View style={[CoreStyle.modal_child, UtilsStyle.p_2]}>
          <Text style={TextStyle.card_l_main}>Sort results by...</Text>
          <View style={UtilsStyle.mb_4}>
            <SortingButton
              text="Relevance"
              setSorting={setSorting}
              sorting={sorting}
            />
            <SortingButton
              text="Title"
              setSorting={setSorting}
              sorting={sorting}
            />
            {/* <SortingButton
              text="Developer"
              setSorting={setSorting}
              sorting={sorting}
            /> */}
            <SortingButton
              text="Ratings"
              setSorting={setSorting}
              sorting={sorting}
            />
            <SortingButton
              text="Release Dates"
              setSorting={setSorting}
              sorting={sorting}
            />
          </View>
          <View
            style={[
              UtilsStyle.flex_row,
              UtilsStyle.space_between,
              UtilsStyle.center_content_v,
              { flexBasis: 32 },
            ]}
          >
            <TouchableOpacity
              onPress={() => setDir(!dir)}
              style={UtilsStyle.flex_row}
            >
              <Text
                style={[
                  TextStyle.body,
                  {
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderBottomLeftRadius: 10,
                    borderTopLeftRadius: 10,
                    borderWidth: 1,
                    borderRightWidth: 0,
                    borderColor: 'rgba(209,209,209,0.75)',
                  },
                  dir
                    ? {
                        backgroundColor: theme_accent.alpha,
                        fontWeight: 'bold',
                      }
                    : {
                        color: 'rgba(209,209,209,0.5)',
                      },
                ]}
              >
                A - Z
              </Text>
              <Text
                style={[
                  TextStyle.body,
                  {
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderBottomRightRadius: 10,
                    borderTopRightRadius: 10,
                    borderWidth: 1,
                    borderLeftWidth: 0,
                    borderColor: 'rgba(209,209,209,0.75)',
                  },
                  dir
                    ? {
                        color: 'rgba(209,209,209,0.5)',
                      }
                    : {
                        backgroundColor: theme_accent.alpha,
                        fontWeight: 'bold',
                      },
                ]}
              >
                Z - A
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShow(false)}>
              <Text style={[TextStyle.body, CoreStyle.color_accent]}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  )
}
