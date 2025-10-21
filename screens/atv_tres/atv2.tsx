import { Button, StyleSheet, View, Linking } from "react-native";

export default function Dois() {
  return (
    <View style={styles.container}>
      <Button title="Chamada telefônica" color="blue" onPress={() => Linking.openURL("tel:+123456789")}/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  }
});
