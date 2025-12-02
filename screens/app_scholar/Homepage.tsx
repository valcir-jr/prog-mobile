import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { TouchableOpacity, StyleSheet, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Homepage() {
  const { logout, user } = useContext(AuthContext);
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Boletim")}
      >
        <Text>Consultar boletim</Text>
      </TouchableOpacity>

      {user && user.type > 1 && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Grades")}
        >
          <Text>Lançar/Alterar Notas</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.text}>Cadastrar</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("RegisterSubject")}
      >
        <Text>Disciplina</Text>
      </TouchableOpacity>

      {user && user.type > 1 && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RegisterStudent")}
        >
          <Text>Aluno</Text>
        </TouchableOpacity>
      )}

      {user && user.type > 2 && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RegisterProf")}
        >
          <Text>Professor</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.text}>Listagens</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SubjectsByProfessor")}
      >
        <Text>Disciplinas por professor</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("StudentsBySubject")}
      >
        <Text>Alunos por disciplina</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={{ color: "white" }}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "skyblue",
    padding: 20,
    borderRadius: 5,
    width: "70%",
    alignItems: "center",
    marginVertical: 10,
  },
  logout: {
    marginTop: 50,
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 40,
  },
});
