import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";

export default function CadastroProfessor() {
  const [nome, setNome] = useState("");
  const [titulacao, setTitulacao] = useState("");
  const [tempoDocencia, setTempoDocencia] = useState("");

  async function cadastrarProfessor() {
    if (!nome || !titulacao || !tempoDocencia) {
      Alert.alert("Erro", "Todos os campos são obrigatórios");
      return;
    }

    if (isNaN(Number(tempoDocencia))) {
      Alert.alert("Erro", "Tempo de docência deve ser um número");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3001/professores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          titulacao,
          tempo_docencia: Number(tempoDocencia),
        }),
      });

      const json = await resposta.json();

      if (json.success) {
        Alert.alert("Sucesso", "Professor cadastrado com sucesso!");
        setNome("");
        setTitulacao("");
        setTempoDocencia("");
      } else {
        Alert.alert("Erro", json.message || "Erro ao cadastrar professor");
      }
    } catch {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Professor</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do professor"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Titulação"
        value={titulacao}
        onChangeText={setTitulacao}
      />
      <TextInput
        style={styles.input}
        placeholder="Tempo de docência (anos)"
        value={tempoDocencia}
        onChangeText={setTempoDocencia}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={cadastrarProfessor}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 5, marginBottom: 15 },
  button: { backgroundColor: "#1E90FF", padding: 15, borderRadius: 5 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
