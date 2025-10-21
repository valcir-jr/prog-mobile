import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  }

  async function register() {
    await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  }

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 130 }}>
        <Text style={styles.title}>App Scholar</Text>
      </View>
      <View>
        <Text style={{ color: "white" }}>Nome do usuário</Text>
        <TextInput
          placeholder="Digite seu nome"
          onChangeText={setUsername}
          style={styles.input}
        />
        <Text style={{ color: "white" }}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          onChangeText={setPassword}
          style={styles.input}
        />
        <View style={{ marginTop: 20, marginBottom: 15 }}>
          <Button title="Login" onPress={login} />
        </View>
        <View>
          <Button title="Cadastrar" onPress={register} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  title: {
    alignSelf: "center",
    color: "white",
    fontSize: 35,
  },
});
