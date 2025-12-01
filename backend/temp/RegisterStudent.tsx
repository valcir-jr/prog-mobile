import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";

export default function CadastroAluno() {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");

  async function cadastrarAluno() {
    try {
      const resposta = await fetch("http://SEU_IP:3000/alunos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, matricula, curso }),
      });

      const json = await resposta.json();

      if (json.success) {
        Alert.alert("Sucesso", "Aluno cadastrado com sucesso!");
        setNome("");
        setMatricula("");
        setCurso("");
      } else {
        Alert.alert("Erro", json.message || "Erro ao cadastrar aluno");
      }
    } catch (e) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Aluno</Text>
      <TextInput style={styles.input} placeholder="Nome do aluno" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Matrícula" value={matricula} onChangeText={setMatricula} />
      <TextInput style={styles.input} placeholder="Curso" value={curso} onChangeText={setCurso} />
      <TouchableOpacity style={styles.button} onPress={cadastrarAluno}>
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
