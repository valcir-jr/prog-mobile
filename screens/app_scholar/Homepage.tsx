import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        Consultar boletim
      </TouchableOpacity>
      <Text style={styles.text}>Cadastrar</Text>
      <TouchableOpacity style={styles.button}>Disciplina</TouchableOpacity>
      {user && user.type > 1 && (
        <TouchableOpacity style={styles.button}>Aluno</TouchableOpacity>
      )}
      {user && user.type > 2 && (
        <TouchableOpacity style={styles.button}>Professor</TouchableOpacity>
      )}
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={{ color: "white" }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "skyblue",
    padding: 20,
    borderRadius: 5,
    width: "50%",
    justifyContent: "center",
    fontFamily: "system-ui",
    textAlign: "center",
    marginVertical: 10,
  },
  logout: {
    margin: 100,
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 60,
  },
});
