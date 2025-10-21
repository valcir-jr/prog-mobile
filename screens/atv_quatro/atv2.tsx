import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Constants from "expo-constants";

export default function Dois() {
  const [mode, setMode] = useState("");

  useEffect(() => {
    readOrientation();

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const subscription = ScreenOrientation.addOrientationChangeListener(
    ({ orientationInfo }) => {
      if (
        orientationInfo.orientation ===
          ScreenOrientation.Orientation.PORTRAIT_UP ||
        orientationInfo.orientation ===
          ScreenOrientation.Orientation.PORTRAIT_DOWN
      ) {
        setMode("portrait");
      } else if (
        orientationInfo.orientation ===
          ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        orientationInfo.orientation ===
          ScreenOrientation.Orientation.LANDSCAPE_RIGHT
      ) {
        setMode("landscape");
      }
    }
  );

  const readOrientation = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();
    if (
      orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
      orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN
    ) {
      setMode("portrait");
    } else if (
      orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
    ) {
      setMode("landscape");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: mode === "portrait" ? "column" : "row",
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <View style={styles.top}>
        <Text>Top</Text>
      </View>
      <View style={styles.middle}>
        <Text>Middle</Text>
      </View>
      <View style={styles.bottom}>
        <Text>Bottom</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  top: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFA07A",
  },
  middle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F08080",
  },
  bottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6437",
  },
});
