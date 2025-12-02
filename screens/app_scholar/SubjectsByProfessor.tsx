import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Professor {
  id: number;
  name: string;
}

interface Disciplina {
  id: number;
  name: string;
  workload: number;
}

export default function DisciplinasPorProfessor() {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [selectedProfessor, setSelectedProfessor] = useState<string>("");
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Carregar professores ao montar a tela
  useEffect(() => {
    fetch("http://localhost:3001/professores")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setProfessores(json.data);
        } else {
          setProfessores([]);
        }
      })
      .catch(() => setProfessores([]));
  }, []);

  // Carregar disciplinas quando um professor for selecionado
  useEffect(() => {
    if (!selectedProfessor) {
      setDisciplinas([]);
      return;
    }

    setLoading(true);
    setError("");

    fetch(`http://localhost:3001/professores/${selectedProfessor}/disciplinas`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.disciplinas)) {
          setDisciplinas(json.disciplinas);
        } else {
          setDisciplinas([]);
          setError("Não foi possível carregar disciplinas");
        }
      })
      .catch(() => setError("Erro de conexão com o servidor"))
      .finally(() => setLoading(false));
  }, [selectedProfessor]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disciplinas por Professor</Text>

      {professores.length === 0 ? (
        <ActivityIndicator size="large" color="#1E90FF" />
      ) : (
        <Picker
          selectedValue={selectedProfessor}
          onValueChange={(value) => setSelectedProfessor(value)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione um professor" value="" />
          {Array.isArray(professores) &&
            professores.map((prof) => (
              <Picker.Item key={prof.id} label={prof.name} value={prof.id.toString()} />
            ))}
        </Picker>
      )}

      {loading && <Text style={styles.info}>Carregando disciplinas...</Text>}
      {error !== "" && <Text style={styles.error}>{error}</Text>}

      {disciplinas.length > 0 && (
        <View style={styles.list}>
          {disciplinas.map((d) => (
            <View key={d.id} style={styles.card}>
              <Text style={styles.cardTitle}>{d.name}</Text>
              <Text style={styles.cardText}>Carga horária: {d.workload}</Text>
            </View>
          ))}
        </View>
      )}

      {!loading && disciplinas.length === 0 && selectedProfessor && error === "" && (
        <Text style={styles.info}>Nenhuma disciplina encontrada para este professor.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  picker: { marginBottom: 20 },
  list: { marginTop: 10 },
  card: { padding: 15, backgroundColor: "#f0f8ff", borderRadius: 5, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardText: { marginTop: 5 },
  info: { textAlign: "center", marginTop: 10, fontStyle: "italic" },
  error: { color: "red", textAlign: "center", marginTop: 10 },
});
