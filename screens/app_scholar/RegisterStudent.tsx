import React, { useState, useEffect } from "react";
import { TextInput, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";

export default function CadastroAluno() {
  const [nome, setNome] = useState("");
  const [registration, setRegistration] = useState(""); // Novo campo matricula
  const [disciplinas, setDisciplinas] = useState<number[]>([]);
  const [listaDisciplinas, setListaDisciplinas] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    async function fetchDisciplinas() {
      try {
        const res = await fetch("http://localhost:3001/disciplinas");
        const json = await res.json();
        if (json.success) {
          setListaDisciplinas(json.data);
        } else {
          Alert.alert("Erro", json.message || "Não foi possível carregar disciplinas");
        }
      } catch {
        Alert.alert("Erro", "Não foi possível conectar ao servidor");
      }
    }
    fetchDisciplinas();
  }, []);

  const toggleDisciplina = (id: number) => {
    setDisciplinas(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  async function cadastrarAluno() {
    if (!nome || !registration || disciplinas.length === 0) {
      return Alert.alert("Erro", "Informe o nome, matrícula e selecione ao menos uma disciplina");
    }

    try {
      const res = await fetch("http://localhost:3001/alunos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, registration, disciplinas }),
      });
      const json = await res.json();
      if (json.success) {
        Alert.alert("Sucesso", "Aluno cadastrado e matriculado com sucesso!");
        setNome("");
        setRegistration("");
        setDisciplinas([]);
      } else {
        Alert.alert("Erro", json.message || "Erro ao cadastrar aluno");
      }
    } catch {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Aluno</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do aluno"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Nº da matrícula"
        value={registration}
        onChangeText={setRegistration}
      />

      <Text style={styles.subtitle}>Selecione as disciplinas:</Text>
      {listaDisciplinas.map(d => (
        <TouchableOpacity
          key={d.id}
          style={[
            styles.disciplina,
            disciplinas.includes(d.id) && styles.disciplinaSelecionada
          ]}
          onPress={() => toggleDisciplina(d.id)}
        >
          <Text style={{ color: disciplinas.includes(d.id) ? "white" : "black" }}>{d.name}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.button} onPress={cadastrarAluno}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  subtitle: { fontSize: 16, marginVertical: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 5, width: "100%", marginBottom: 15 },
  disciplina: { padding: 12, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginVertical: 5, width: "100%" },
  disciplinaSelecionada: { backgroundColor: "skyblue" },
  button: { backgroundColor: "#1E90FF", padding: 15, borderRadius: 5, marginTop: 20, width: "100%" },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
