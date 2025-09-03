import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Seis() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState("");

  function handlePress() {
    setResult(name + " - " + age);
  }

  return (
    <View style={styles.container}>
      <Text>Nome</Text>
      <TextInput
        placeholder="Digite seu nome"
        onChangeText={setName}
        style={styles.input}
      />
      <Text>Idade</Text>
      <TextInput
        placeholder="Digite sua idade"
        keyboardType="numeric"
        onChangeText={setAge}
        style={styles.input}
      />
      <Button title="SALVAR" onPress={handlePress} />
      <Text style={styles.resultado}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "gray",
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
