import React, { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../contexts/AuthProvider";

export default function LaunchGrades() {
  const { user } = useContext(AuthContext);

  const [alunos, setAlunos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState("");
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState("");
  const [nota1, setNota1] = useState("");
  const [nota2, setNota2] = useState("");

  // Buscar alunos e disciplinas
  useEffect(() => {
    async function fetchAlunos() {
      try {
        const resposta = await fetch("http://localhost:3001/alunos");
        const json = await resposta.json();
        if (json.success) setAlunos(json.data || json.alunos || []);
      } catch {
        Alert.alert("Erro", "Não foi possível carregar alunos");
      }
    }

    async function fetchDisciplinas() {
      try {
        const resposta = await fetch("http://localhost:3001/disciplinas");
        const json = await resposta.json();
        if (json.success) setDisciplinas(json.data || json.disciplinas || []);
      } catch {
        Alert.alert("Erro", "Não foi possível carregar disciplinas");
      }
    }

    fetchAlunos();
    fetchDisciplinas();
  }, []);

  async function lancarNotas() {
    if (!alunoSelecionado || !disciplinaSelecionada || nota1 === "" || nota2 === "") {
      Alert.alert("Erro", "Todos os campos são obrigatórios");
      return;
    }

    if (isNaN(Number(nota1)) || isNaN(Number(nota2))) {
      Alert.alert("Erro", "Notas devem ser números válidos");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3001/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aluno_id: Number(alunoSelecionado),
          disciplina_id: Number(disciplinaSelecionada),
          nota1: Number(nota1),
          nota2: Number(nota2),
        }),
      });

      const json = await resposta.json();

      if (json.success) {
        Alert.alert("Sucesso", json.message || "Notas lançadas com sucesso!");
        setAlunoSelecionado("");
        setDisciplinaSelecionada("");
        setNota1("");
        setNota2("");
      } else {
        Alert.alert("Erro", json.message || "Erro ao lançar notas");
      }
    } catch {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  }

  // Se o usuário não for professor ou admin, não renderiza a tela
  if (!user || user.type < 2) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lançamento / Alteração de Notas</Text>

      <Text style={styles.label}>Aluno</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={alunoSelecionado}
          onValueChange={(itemValue) => setAlunoSelecionado(itemValue)}
        >
          <Picker.Item label="Selecione um aluno" value="" />
          {alunos.map((aluno: any) => (
            <Picker.Item key={aluno.id} label={aluno.name} value={aluno.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Disciplina</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={disciplinaSelecionada}
          onValueChange={(itemValue) => setDisciplinaSelecionada(itemValue)}
        >
          <Picker.Item label="Selecione uma disciplina" value="" />
          {disciplinas.map((disciplina: any) => (
            <Picker.Item key={disciplina.id} label={disciplina.name} value={disciplina.id} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nota 1"
        value={nota1}
        onChangeText={setNota1}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nota 2"
        value={nota2}
        onChangeText={setNota2}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={lancarNotas}>
        <Text style={styles.buttonText}>Lançar Notas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  label: { fontWeight: "bold", marginBottom: 5 },
  pickerContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 15 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 5, marginBottom: 15 },
  button: { backgroundColor: "#1E90FF", padding: 15, borderRadius: 5 },
  buttonText: { color: "white", fontWeight: "bold", textAlign: "center" },
});
