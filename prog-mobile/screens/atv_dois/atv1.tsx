import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/fatec.png";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { RootStackParamList } from "@/types";
// import OutroUm from "../screens/atv_dois/atv1";
// import Um from "@/screens/atv_um/atv1";
// import Dois from "@/screens/atv_um/atv2";
// import Tres from "@/screens/atv_um/atv3";
// import Quatro from "@/screens/atv_um/atv4";
// import Cinco from "@/screens/atv_um/atv5";
// import Seis from "@/screens/atv_um/atv6";
// import Sete from "@/screens/atv_um/atv7";
// import Oito from "@/screens/atv_um/atv8";
// import Nove from "@/screens/atv_um/atv9";
// import Dez from "@/screens/atv_um/atv10";

// const Stack = createNativeStackNavigator<RootStackParamList>();

// const App: React.FC = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={OutroUm} options={{ title: "Início" }} />
//       <Stack.Screen name="Um" component={Um} options={{ title: "Exercício 1" }} />
//       <Stack.Screen name="Dois" component={Dois} options={{ title: "Exercício 2" }} />
//       <Stack.Screen name="Três" component={Tres} options={{ title: "Exercício 3" }} />
//       <Stack.Screen name="Quatro" component={Quatro} options={{ title: "Exercício 4" }} />
//       <Stack.Screen name="Cinco" component={Cinco} options={{ title: "Exercício 5" }} />
//       <Stack.Screen name="Seis" component={Seis} options={{ title: "Exercício 6" }} />
//       <Stack.Screen name="Sete" component={Sete} options={{ title: "Exercício 7" }} />
//       <Stack.Screen name="Oito" component={Oito} options={{ title: "Exercício 8" }} />
//       <Stack.Screen name="Nove" component={Nove} options={{ title: "Exercício 9" }} />
//       <Stack.Screen name="Dez" component={Dez} options={{ title: "Exercício 10" }} />
//     </Stack.Navigator>
//   );
// }

// export default App;

interface Props extends NativeStackScreenProps<RootStackParamList, "Home"> {}

const Um: React.FC<Props> = ({ navigation }) => {
  const numbers = [
    "Um",
    "Dois",
    "Três",
    "Quatro",
    "Cinco",
    "Seis",
    "Sete",
    "Oito",
    "Nove",
    "Dez",
  ];
  const firstColumn = numbers.slice(0, 5);
  const secondColumn = numbers.slice(5);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.moldura}>
        <Image source={logo} style={{ height: 120, width: 200 }} />
        <Text style={{ fontWeight: "bold", fontSize: 22, marginBottom: 10 }}>
          HOME
        </Text>
        <View style={styles.columnsContainer}>
          <View style={styles.column}>
            {firstColumn.map((item, index) => (
              <TouchableOpacity key={index} style={styles.block} onPress={() => navigation.navigate(item)}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.column}>
            {secondColumn.map((item, index) => (
              <TouchableOpacity key={index} style={styles.block} onPress={() => navigation.navigate(item)}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Um

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0ebe4",
  },
  moldura: {
    borderWidth: 2,
    borderColor: "#aaa",
    padding: 20,
    borderRadius: 8,
    alignSelf: "center",
    alignItems: "center",
    maxWidth: 270,
    width: "100%",
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  block: {
    borderRadius: 6,
    padding: 15,
    backgroundColor: "#ffd82b",
    alignItems: "center",
    marginBottom: 10,
    width: "90%",
  },
});