import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, FlatList, ScrollView, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface BoletimItem {
  disciplina: string;
  professor: string;
  nota1: number | null;
  nota2: number | null;
  media: number | null;
}

export default function Boletim() {
  const [alunoId, setAlunoId] = useState<number | null>(null);
  const [boletim, setBoletim] = useState<BoletimItem[]>([]);
  const [aluno, setAluno] = useState<any>(null);
  const [alunos, setAlunos] = useState<{id: number, name: string, registration: string}[]>([]);

  useEffect(() => {
    async function fetchAlunos() {
      try {
        const res = await fetch("http://localhost:3001/alunos");
        const json = await res.json();
        if (json.success) {
          setAlunos(json.alunos);
        } else {
          Alert.alert("Erro", json.message || "Não foi possível carregar alunos");
        }
      } catch {
        Alert.alert("Erro", "Não foi possível conectar ao servidor");
      }
    }
    fetchAlunos();
  }, []);

  async function consultarBoletim() {
    if (!alunoId) {
      Alert.alert("Erro", "Selecione um aluno");
      return;
    }

    try {
      const resposta = await fetch(`http://localhost:3001/boletim/${alunoId}`);
      const json = await resposta.json();

      if (json.success) {
        setBoletim(json.boletim);
        setAluno(json.aluno);
      } else {
        Alert.alert("Erro", json.message || "Não foi possível consultar boletim");
      }
    } catch {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Boletim do Aluno</Text>

      {/* Picker para selecionar aluno */}
      <Picker
        selectedValue={alunoId}
        onValueChange={(value) => setAlunoId(value)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um aluno" value={null} />
        {alunos.map(a => (
          <Picker.Item key={a.id} label={`${a.name} (${a.registration})`} value={a.id} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={consultarBoletim}>
        <Text style={styles.buttonText}>Consultar</Text>
      </TouchableOpacity>

      {aluno && (
        <View style={styles.alunoInfo}>
          <Text style={styles.subTitle}>Aluno: {aluno.name}</Text>
          <Text style={styles.subTitle}>Matrícula: {aluno.registration}</Text>
        </View>
      )}

      {boletim.length > 0 ? (
        <FlatList
          data={boletim}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.disciplina}</Text>
              <Text style={styles.itemText}>Professor: {item.professor}</Text>
              <View style={styles.notasRow}>
                <Text style={styles.nota}>Nota 1: {item.nota1 ?? "-"}</Text>
                <Text style={styles.nota}>Nota 2: {item.nota2 ?? "-"}</Text>
                <Text style={styles.nota}>Média: {item.media ?? "-"}</Text>
              </View>
            </View>
          )}
        />
      ) : aluno ? (
        <Text style={styles.noData}>Nenhuma disciplina encontrada para este aluno.</Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  picker: { width: "100%", marginBottom: 10 },
  button: { backgroundColor: "#1E90FF", padding: 15, borderRadius: 5, width: "100%", marginBottom: 15 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
  alunoInfo: { marginBottom: 20, width: "100%" },
  subTitle: { fontSize: 16, fontWeight: "600", marginVertical: 2 },
  item: { padding: 15, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10, backgroundColor: "#f0f8ff" },
  itemTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  itemText: { fontSize: 14, marginBottom: 5 },
  notasRow: { justifyContent: "space-between" },
  nota: { fontSize: 14, fontWeight: "600" },
  noData: { marginTop: 20, fontStyle: "italic", color: "#555" },
});
