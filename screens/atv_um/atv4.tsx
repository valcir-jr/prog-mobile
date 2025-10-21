import React from "react";
import { Image, StyleSheet, View } from "react-native";
import logo from "../../assets/images/adaptive-icon.png";

export default function Quatro() {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.topLeft}>
          <Image
            source={logo}
            resizeMode="contain"
            style={{ alignSelf: "center", flex: 1 }}
          />
        </View>
        <View style={styles.topRight}>
          <View style={styles.topRightTop}>
            <Image
              source={logo}
              resizeMode="contain"
              style={{ alignSelf: "center", flex: 1 }}
            />
          </View>
          <View style={styles.topRightBottom}>
            <Image
              source={logo}
              resizeMode="contain"
              style={{ alignSelf: "center", flex: 1 }}
            />
          </View>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Image
          source={logo}
          resizeMode="contain"
          style={{ alignSelf: "center", flex: 1 }}
        />
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
  },
  topRight: {
    flex: 0.5,
    backgroundColor: "aquamarine",
    flexDirection: "column",
  },
  topRightTop: {
    flex: 0.5,
    backgroundColor: "teal",
  },
  topRightBottom: {
    flex: 0.5,
    backgroundColor: "skyblue",
  },
  bottomSection: {
    flex: 0.5,
    backgroundColor: "salmon",
  },
});
