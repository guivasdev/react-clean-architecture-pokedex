import { StyleProp, TextStyle, View, ViewStyle, Image, ImageStyle } from "react-native"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { Text } from "@/components/Text"
import { colors } from "@/theme/colors"

export interface ImageModelProps {
  style?: StyleProp<ViewStyle>
  visible: boolean
  setVisible: (visible: boolean) => void
  namePoke: string
  imagePoke: string
}


export const ImageModel = ({ visible, setVisible, namePoke, imagePoke, ...props }: ImageModelProps) => {
  const { style } = props
  const $styles = [$container, style]
  const { themed } = useAppTheme();

  return (
    <View style={$card}>
      <Image
        style={$image}
        source={{ uri: imagePoke }}
        resizeMode="contain"
      />

      <Text style={themed($text)}>{namePoke}</Text>
    </View>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
  width: '75%',
  height: '50%',
  backgroundColor: 'white'
}


const $card: ViewStyle = {
  backgroundColor: colors.palette.neutral700,
  borderRadius: 20,
  padding: 16,
  alignItems: "center",
  justifyContent: "center",

  // sombra (Android + iOS)
  elevation: 5,
  shadowColor: "#000",
  shadowOpacity: 0.3,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 5 },

  margin: 10,
}

const $image: ImageStyle = {
  width: 140,
  height: 140,
  marginBottom: 10,
}

const $text: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: "#FFF",
  textTransform: "capitalize",
}