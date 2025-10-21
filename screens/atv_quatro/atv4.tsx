import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Constants from "expo-constants";

export default function Quatro() {
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
    <>
      <SafeAreaView
        style={{
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: mode === "portrait" ? "#FFA07A" : "#faf7cd",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Exercício 4</Text>
      </SafeAreaView>
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: mode === "portrait" ? "column" : "row",
          paddingTop: Constants.statusBarHeight,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: mode === "portrait" ? "#F08080" : "#ffec82",
          }}
        >
          <Text>Middle</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: mode === "portrait" ? "#FF6437" : "#bebf75",
          }}
        >
          <Text>Bottom</Text>
        </View>
      </SafeAreaView>
    </>
  );
}
