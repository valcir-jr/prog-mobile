import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Sete() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [result, setResult] = useState("");

  function handlePress() {
    setResult(email + " - " + pwd);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: "white" }}>E-mail</Text>
      <TextInput
        placeholder="Digite seu e-mail"
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
      />
      <Text style={{ color: "white" }}>Senha</Text>
      <TextInput
        placeholder="Digite sua senha"
        onChangeText={setPwd}
        style={styles.input}
        secureTextEntry={true}
        maxLength={8}
      />
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 15 }}>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          Logar
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>Cadastrar-se</TouchableOpacity>
      </View>
      <Text style={styles.resultado}>{result}</Text>
    </SafeAreaView>
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
  button: {
    backgroundColor: "#ffae00ff",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    fontFamily: "Arial",
  },
});
