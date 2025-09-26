import { Contexto } from "@/contexts/CepProvider";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Cinco() {
  const {resultado} = useContext(Contexto);

  return (
    <View style={styles.container}>
      {resultado.map((item, index) => (
        <View key={index}>
          <Text style={styles.text}>Logradouro: {item.logradouro}</Text>
          <Text style={styles.text}>Localidade: {item.localidade}</Text>
          <Text style={styles.text}>UF: {item.uf}</Text>

          <View style={styles.hr} />
        </View>
      ))}   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#252525ff",
  },
  text: {
    color: "white",
    fontSize: 18
  },
  hr: {
    borderBottomColor: '#999', // or any color
    borderBottomWidth: StyleSheet.hairlineWidth, // 1px or hairline
    marginTop: 10,
    marginBottom: 10,
  }
});
