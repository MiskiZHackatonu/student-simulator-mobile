import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function BootScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    const load = async () => {
      await requestPermission();

      // router.replace("/games");

      if (permission?.granted) {
        // Redirect to the next screen
        // If nick is not set, we have to show onboarding screen
        const storedNick = await AsyncStorage.getItem("nick");

        if (storedNick) {
          router.replace({
            pathname: "/games",
            params: {
              nick: storedNick,
            },
          });
        } else {
          router.replace("/onboarding");
        }
      }
    };
    load();
  }, [permission?.granted, requestPermission]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return null;
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
