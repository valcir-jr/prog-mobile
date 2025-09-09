import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Seis() {
  const [cep, setCep] = useState("");

  return (
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 17, marginBottom: 10 }}>CEP</Text>
      <TextInput
        placeholder="Digite o CEP"
        onChangeText={setCep}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Obter" />
      <Text style={styles.resultado}>{cep}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#252525ff",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  resultado: {
    marginTop: 10,
    color: "white",
  },
});
