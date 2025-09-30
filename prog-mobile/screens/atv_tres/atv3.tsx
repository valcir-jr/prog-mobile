import { Button, StyleSheet, View, Linking, Alert } from "react-native";

export default function Tres() {
  function handlePress() {
    let url = "https://www.instagram.com/fatec_jacarei";

    Linking.canOpenURL(url)
      .then((supported) => {
        if(supported) {
          Linking.openURL(url);
        } else {
            Alert.alert("Erro")
        }
      })
      .catch((err) => console.error("Erro inesperado", err));
  };

  return (
    <View style={styles.container}>
      <Button title="Instagram Fatec Jacareí" color="#97074aff" onPress={handlePress}/> 
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
