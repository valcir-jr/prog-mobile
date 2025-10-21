import { Contexto } from "@/contexts/CepProvider";
import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Quatro() {
  const [firstSearch, setFirstSearch] = useState(true);
  const [cepInput, setCepInput] = useState("");
  const [isValid, setIsValid] = useState(false);

  const {resultado, fetchCep} = useContext(Contexto);

  async function handlePress() {
    const success = await fetchCep(cepInput);
    setIsValid(success);
    setFirstSearch(false);
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 17, marginBottom: 10 }}>CEP</Text>
      <TextInput
        placeholder="Digite o CEP"
        style={styles.input}
        onChangeText={setCepInput}
        keyboardType="numeric"
      />
      <Button title="Obter" onPress={handlePress} />
      
      {!firstSearch && !isValid && resultado.length > 0 && (
        <Text style={styles.text}>CEP Inválido</Text>
      )}

      {!firstSearch && isValid && resultado.length > 0 && (
        <>
          <Text style={styles.text}>Logradouro: {resultado[resultado.length - 1].logradouro}</Text>
          <Text style={styles.text}>Localidade: {resultado[resultado.length - 1].localidade}</Text>
          <Text style={styles.text}>UF: {resultado[resultado.length - 1].uf}</Text>
        </>
      )}
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
  text: {
    marginTop: 10,
    color: "white",
  },
});
