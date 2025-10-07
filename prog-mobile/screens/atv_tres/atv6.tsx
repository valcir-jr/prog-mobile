import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Constants from "expo-constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function Seis() {
  const [image, setImage] = useState<string | null>(null);
    
  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"], 
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1, 
    })

    if(!result.canceled) {
        setImage(result.assets[0].uri);
    }
  }

  const openCamera = async () => {
    ImagePicker.launchCameraAsync({
        mediaTypes: ["videos"],
        allowsEditing: true,
        quality: 1
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={openCamera}>
          <MaterialIcons
            size={32}
            name="photo-camera"
            style={{ color: "deepskyblue" }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery}>
          <MaterialIcons
            size={32}
            name="photo"
            style={{ color: "deepskyblue" }}
          />
        </TouchableOpacity>
      </View>

      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  iconsContainer: {
    flexDirection: "row-reverse",
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    alignSelf: "center"
  }
});
