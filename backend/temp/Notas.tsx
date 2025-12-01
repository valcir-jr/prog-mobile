import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";

export default function LancamentoNotas() {
  const [alunoId, setAlunoId] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("");
  const [nota1, setNota1] = useState("");
  const [nota2, setNota2] = useState("");

  async function lancarNotas() {
    try {
      const resposta = await fetch("http://SEU_IP:3000/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aluno_id: Number(alunoId),
          disciplina_id: Number(disciplinaId),
          nota1: Number(nota1),
          nota2: Number(nota2),
        }),
      });

      const json = await resposta.json();

      if (json.success) {
        Alert.alert("Sucesso", "Notas lançadas com sucesso!");
        setAlunoId("");
        setDisciplinaId("");
        setNota1("");
        setNota2("");
      } else {
        Alert.alert("Erro", json.message || "Erro ao lançar notas");
      }
    } catch (e) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lançamento de Notas</Text>
      <TextInput style={styles.input} placeholder="ID do Aluno" value={alunoId} onChangeText={setAlunoId} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="ID da Disciplina" value={disciplinaId} onChangeText={setDisciplinaId} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Nota 1" value={nota1} onChangeText={setNota1} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Nota 2" value={nota2} onChangeText={setNota2} keyboardType="numeric" />
      <TouchableOpacity style={styles.button} onPress={lancarNotas}>
        <Text style={styles.buttonText}>Lançar Notas</Text>
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
