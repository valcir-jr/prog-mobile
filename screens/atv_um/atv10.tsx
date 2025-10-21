import React, { useState } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

export default function Dez() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCpwd] = useState("");
  const [role, setRole] = useState("manager");
  const [isEnabled, setIsEnabled] = useState(true);

  const [result, setResult] = useState("");

  function parse(input: boolean): string {
    if (input) {
      return "sim";
    }
    return "não";
  }

  function handlePress() {
    if (email === "" || pwd === "" || cpwd === "") {
      setResult("");
      return;
    }
    setResult(`${email} - ${pwd} - ${cpwd} - ${role} - ${parse(isEnabled)}`);
  }

  function toggleSwitch() {
    setIsEnabled((prevState: boolean) => !prevState);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.moldura}>
        <Text
          style={{
            color: "#d6ff21ff",
            fontWeight: "bold",
            fontSize: 17,
            alignSelf: "center",
          }}
        >
          CADASTRO
        </Text>
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
        <Text style={{ color: "white" }}>Confirmação da senha</Text>
        <TextInput
          placeholder="Confirme a senha"
          onChangeText={setCpwd}
          style={styles.input}
          secureTextEntry={true}
          maxLength={8}
        />
        <Text style={{ color: "white" }}>Permissão</Text>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Administrador" value="admin" />
          <Picker.Item label="Gestor" value="manager" />
          <Picker.Item label="Usuário" value="user" />
        </Picker>
        <View
          style={{ flexDirection: "row", gap: 15 }}
        >
          <Text style={{ color: "white" }}>Manter-se conectado</Text>
          <Switch
            trackColor={{ false: "#e77878", true: "#94df83" }}
            thumbColor={isEnabled ? "#47eb22" : "#ed1111"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 15 }}
        >
          <TouchableOpacity onPress={handlePress} style={styles.button}>
            Logar
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            Cadastrar-se
          </TouchableOpacity>
        </View>
        <Text style={styles.resultado}>{result}</Text>
      </View>
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
  moldura: {
    borderWidth: 2,
    borderColor: "#aaa",
    padding: 20,
    borderRadius: 8,
    alignSelf: "center",
    maxWidth: 270,
    width: "100%",
  },
});
