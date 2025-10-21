import React from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import logo from "../../assets/images/adaptive-icon.png";

export default function Cinco() {
  function handlePress() {
    Alert.alert("Boa noite!");
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.topLeft}>
          <TouchableOpacity onPress={handlePress}>
            <Image source={logo} resizeMode="contain" style={styles.image} />
          </TouchableOpacity>
        </View>
        <View style={styles.topRight}>
          <View style={styles.topRightTop}>
            <TouchableOpacity onPress={handlePress}>
              <Image source={logo} resizeMode="contain" style={styles.image} />
            </TouchableOpacity>
          </View>
          <View style={styles.topRightBottom}>
            <TouchableOpacity onPress={handlePress}>
              <Image source={logo} resizeMode="contain" style={styles.image} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={handlePress}>
          <Image source={logo} resizeMode="contain" style={styles.image} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  topSection: {
    flex: 0.5,
    backgroundColor: "crimson",
    flexDirection: "row",
  },
  topLeft: {
    flex: 0.5,
    backgroundColor: "lime",
    justifyContent: "center",
    alignItems: "center",
  },
  topRight: {
    flex: 0.5,
    backgroundColor: "aquamarine",
    flexDirection: "column",
  },
  topRightTop: {
    flex: 0.5,
    backgroundColor: "teal",
    justifyContent: "center",
    alignItems: "center",
  },
  topRightBottom: {
    flex: 0.5,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    flex: 0.5,
    backgroundColor: "salmon",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 64,
    width: 64,
    alignSelf: "center",
  },
});
