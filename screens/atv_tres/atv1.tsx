import { Button, StyleSheet, View, Linking, Alert } from "react-native";

export default function Um() {
  function handlePress() {
    let url = "https://www.youtube.com/watch?v=pBy1zgt0XPc";

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
      <Button title="Youtube" color="red" onPress={handlePress}/> 
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
