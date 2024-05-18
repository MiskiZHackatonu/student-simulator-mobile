import { CameraView } from "expo-camera";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Camera({ onBarcodeScanned }) {
  const [facing, setFacing] = useState("back");

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={onBarcodeScanned}
        style={styles.camera}
        facing={facing}
      />
      <TouchableOpacity
        style={[
          styles.button,
          {
            position: "absolute",
            right: 30,
            bottom: 30,
          },
        ]}
        onPress={toggleCameraFacing}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 50,
            padding: 10,
          }}
        >
          <MaterialIcons name="flip-camera-ios" size={32} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
