import Constants from "expo-constants";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Um() {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}></View>
      <View style={styles.bottomSection}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    flexDirection: "column",
  },
  topSection: {
    flex: 0.5,
    backgroundColor: "crimson",
    flexDirection: "row",
  },
  bottomSection: {
    flex: 0.5,
    backgroundColor: "salmon",
  },
});
