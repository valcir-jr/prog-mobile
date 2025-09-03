import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/fatec.png";

export default function Um() {
  const numbers = [
    "Um",
    "Dois",
    "Três",
    "Quatro",
    "Cinco",
    "Seis",
    "Sete",
    "Oito",
    "Nove",
    "Dez",
  ];
  const firstColumn = numbers.slice(0, 5);
  const secondColumn = numbers.slice(5);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.moldura}>
        <Image source={logo} style={{ height: 120, width: 200 }} />
        <Text style={{ fontWeight: "bold", fontSize: 22, marginBottom: 10 }}>
          HOME
        </Text>
        <View style={styles.columnsContainer}>
          <View style={styles.column}>
            {firstColumn.map((item, index) => (
              <TouchableOpacity key={index} style={styles.block}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.column}>
            {secondColumn.map((item, index) => (
              <TouchableOpacity key={index} style={styles.block}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0ebe4",
  },
  moldura: {
    borderWidth: 2,
    borderColor: "#aaa",
    padding: 20,
    borderRadius: 8,
    alignSelf: "center",
    alignItems: "center",
    maxWidth: 270,
    width: "100%",
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  block: {
    borderRadius: 6,
    padding: 15,
    backgroundColor: "#ffd82b",
    alignItems: "center",
    marginBottom: 10,
    width: "90%",
  },
});
