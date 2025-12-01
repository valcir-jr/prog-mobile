import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, StyleSheet } from "react-native";

export default function Boletim() {
  const [alunoId, setAlunoId] = useState("");
  const [boletim, setBoletim] = useState([]);
  const [aluno, setAluno] = useState(null);

  async function consultarBoletim() {
    try {
      const resposta = await fetch(`http://SEU_IP:3000/boletim/${alunoId}`);
      const json = await resposta.json();

      if (json.success) {
        setBoletim(json.boletim);
        setAluno(json.aluno);
      } else {
        Alert.alert("Erro", json.message || "Não foi possível consultar boletim");
      }
    } catch (e) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Boletim do Aluno</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Aluno"
        value={alunoId}
        onChangeText={setAlunoId}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={consultarBoletim}>
        <Text style={styles.buttonText}>Consultar</Text>
      </TouchableOpacity>

      {aluno && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.subTitle}>Aluno: {aluno.name}</Text>
          <Text style={styles.subTitle}>Matrícula: {aluno.registration}</Text>
          <Text style={styles.subTitle}>Curso: {aluno.course}</Text>
        </View>
      )}

      <FlatList
        data={boletim}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>Disciplina: {item.disciplina}</Text>
            <Text style={styles.itemText}>Professor: {item.professor}</Text>
            <Text style={styles.itemText}>Nota 1: {item.nota1}</Text>
            <Text style={styles.itemText}>Nota 2: {item.nota2}</Text>
            <Text style={styles.itemText}>Média: {item.media}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
  subTitle: { fontSize: 16, fontWeight: "600", marginVertical: 2 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 5, marginBottom: 10 },
  button: { backgroundColor: "#1E90FF", padding: 15, borderRadius: 5 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
  item: { padding: 15, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10 },
  itemText: { fontSize: 14 }
});
