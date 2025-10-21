import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, TextInput, StyleSheet } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Constants from "expo-constants";

export default function Cinco() {
  const [mode, setMode] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [inputName, setInputName] = useState("");

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

  function addToList() {
    if (inputName.trim() !== "") {
      setNames([...names, inputName.trim()]);
      setInputName("");
    }
  }

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
            paddingHorizontal: 10,
            paddingVertical: 20,
            backgroundColor: mode === "portrait" ? "#F08080" : "#ffec82",
            ...(mode === "landscape" ? { flex: 1} : {})
          }}
        >
          <Text style={{ paddingBottom: 3, color: "silver" }}>Nome</Text>
          <TextInput
            placeholder="Nome completo"
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              padding: 10,
              borderRadius: 3,
            }}
            onSubmitEditing={addToList}
            returnKeyType="done"
            value={inputName}
            onChangeText={setInputName}
          />
        </View>
        <View
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: mode === "portrait" ? "#FF6437" : "#bebf75",
          }}
        >
          {names.map((item, index) => (
            <>
              <Text key={index}>{item}</Text>
              <View
                style={{
                  borderBottomColor: "silver",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
            </>
          ))}
        </View>
      </SafeAreaView>
    </>
  );
}
