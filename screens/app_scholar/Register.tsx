import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("1");

  const { login } = useContext(AuthContext);
  const navigation = useNavigation<any>();

  async function handleRegister() {
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, type }),
      });

      const data = await response.json();

      if (data.success) {
        login(data.data.user)
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
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
          secureTextEntry={true}
          placeholder="Digite sua senha"
          onChangeText={setPassword}
          style={styles.input}
        />
        <Text style={{ color: "white" }}>Perfil</Text>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Aluno" value="1" />
          <Picker.Item label="Professor" value="2" />
          <Picker.Item label="Administrador" value="3" />
        </Picker>
        <View style={{ marginTop: 20, marginBottom: 15 }}>
          <Button title="Cadastrar" onPress={handleRegister} />
        </View>
        <View>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
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
