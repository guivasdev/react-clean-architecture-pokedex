import { FC, use, useState } from "react"
import { View, ViewStyle, Text, TouchableOpacity, TextStyle } from "react-native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"
import { colors } from "@/theme/colors"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { ImageModel } from "@/features/image/components/ImageModel"
import { TextField } from "@/components/TextField"
import { usePoke } from "@/features/image/hooks/usePoke"

interface HomeScreenProps extends AppStackScreenProps<"Home"> { }

export const HomeScreen: FC<HomeScreenProps> = () => {

  const { themed } = useAppTheme()
  const [visibleImageModel, setVisibleImageModel] = useState(false)
  const { name, setName, sendNameApi, imagePoke, namePoke } = usePoke()

  return (
    <Screen contentContainerStyle={themed($root)} preset="scroll">

      <View style={themed($form)}>

        {/* Parte 1 */}
        <View style={$top}>
          <Text style={[themed($title), { fontSize: 30 }]}>
            Bem vindo
          </Text>
          <Text style={themed($title)}>Busca de Pokemon - PokéAPI</Text>
        </View>
        {/* Parte 2 */}
        <View style={$bottom}>
          <TextField containerStyle={{ width: '90%', marginBottom:30 }}value={name} onChangeText={setName} />

          <TouchableOpacity style={$button} onPress={() => { sendNameApi(), setVisibleImageModel(true) }}>
            <Text style={$buttonText}>Buscar</Text>
          </TouchableOpacity>

        </View>
        {visibleImageModel &&
          <ImageModel style={{ position: 'absolute', alignItems: 'center', alignSelf: 'center', borderRadius: 15 }} visible={visibleImageModel} namePoke={namePoke} imagePoke={imagePoke} setVisible={setVisibleImageModel} />}
      </View>
      {/* Modal */}

    </Screen>
  )
}

// {visibleImageModel &&
//     <ImageModel style={{ position: 'absolute' }} visible={visibleImageModel} setVisible={setVisibleImageModel} />}

const $root: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: colors.background,
  flex: 1,
  justifyContent: 'center',
  alignItems: "center",

})

const $form: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: colors.palette.neutral300,
  justifyContent: "space-around",
  borderColor: colors.palette.neutral400,
  borderWidth: 2,
  borderRadius: 15,
  height: '80%',
  width: '90%'
})
const $top: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}
const $bottom: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",

}
const $title: TextStyle = {
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
  color: "#000",
  letterSpacing: 1.5
}
const $button: ViewStyle = {
  paddingVertical: 12,
  paddingHorizontal: 24,
  backgroundColor: "#000",
  borderRadius: 8,
}
const $buttonText: TextStyle = {
  color: "#fff",
  fontSize: 16,
}

