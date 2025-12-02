import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function CadastroDisciplina() {
  const [nome, setNome] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [professores, setProfessores] = useState([]);
  const [professorSelecionado, setProfessorSelecionado] = useState("");

  // Buscar professores ao montar a tela
  useEffect(() => {
    async function fetchProfessores() {
      try {
        const resposta = await fetch("http://localhost:3001/professores");
        const json = await resposta.json();
        if (json.success) {
          setProfessores(json.data || json.professores || []);
        } else {
          Alert.alert("Erro", "Não foi possível carregar os professores");
        }
      } catch {
        Alert.alert("Erro", "Não foi possível conectar ao servidor");
      }
    }
    fetchProfessores();
  }, []);

  async function cadastrarDisciplina() {
    if (!nome || !cargaHoraria || !professorSelecionado) {
      Alert.alert("Erro", "Todos os campos são obrigatórios");
      return;
    }

    if (isNaN(Number(cargaHoraria))) {
      Alert.alert("Erro", "Carga horária deve ser um número");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3001/disciplinas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          carga_horaria: Number(cargaHoraria),
          professor_id: Number(professorSelecionado),
        }),
      });

      const json = await resposta.json();

      if (json.success) {
        Alert.alert("Sucesso", "Disciplina cadastrada com sucesso!");
        setNome("");
        setCargaHoraria("");
        setProfessorSelecionado("");
      } else {
        Alert.alert("Erro", json.message || "Erro ao cadastrar disciplina");
      }
    } catch {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Disciplina</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da disciplina"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Carga horária (em horas)"
        value={cargaHoraria}
        onChangeText={setCargaHoraria}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Professor responsável</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={professorSelecionado}
          onValueChange={(itemValue) => setProfessorSelecionado(itemValue)}
        >
          <Picker.Item label="Selecione um professor" value="" />
          {professores.map((prof: any) => (
            <Picker.Item key={prof.id} label={prof.name} value={prof.id} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={cadastrarDisciplina}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 5, marginBottom: 15 },
  label: { marginBottom: 5, fontWeight: "bold" },
  pickerContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 20 },
  button: { backgroundColor: "#1E90FF", padding: 15, borderRadius: 5 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
