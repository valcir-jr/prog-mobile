import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Subject {
  id: number;
  name: string;
}

interface Student {
  id: number;
  name: string;
  registration: string;
}

export default function StudentsBySubject() {
  const [disciplinas, setDisciplinas] = useState<Subject[]>([]);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<string>("");
  const [alunos, setAlunos] = useState<Student[]>([]);

  // Buscar disciplinas ao iniciar
  useEffect(() => {
    fetch("http://localhost:3001/disciplinas")
      .then(res => res.json())
      .then(json => {
        if (json.success) setDisciplinas(json.data);
      })
      .catch(console.log);
  }, []);

  // Buscar alunos quando selecionar disciplina
  useEffect(() => {
    if (!disciplinaSelecionada) return;

    fetch(`http://localhost:3001/disciplinas/${disciplinaSelecionada}/alunos`)
      .then(res => res.json())
      .then(json => {
        if (json.success) setAlunos(json.alunos);
        else setAlunos([]);
      })
      .catch(console.log);
  }, [disciplinaSelecionada]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alunos por Disciplina</Text>

      <Picker
        selectedValue={disciplinaSelecionada}
        onValueChange={(itemValue) => setDisciplinaSelecionada(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma disciplina" value="" />
        {disciplinas.map(d => (
          <Picker.Item key={d.id} label={d.name} value={d.id.toString()} />
        ))}
      </Picker>

      {alunos.length > 0 && (
        <FlatList
          data={alunos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardText}>Matrícula: {item.registration}</Text>
            </View>
          )}
        />
      )}
      {disciplinaSelecionada && alunos.length === 0 && (
        <Text style={styles.info}>Nenhum aluno matriculado nesta disciplina.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  picker: { backgroundColor: "#eee", marginBottom: 20 },
  card: { padding: 15, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardText: { marginTop: 5 },
  info: { fontStyle: "italic", textAlign: "center", marginTop: 10, color: "#555" },
});
