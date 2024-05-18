import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useCallback, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { registerUser, loginUser } from "./api";

export default function OnboardingHome() {
  const [nick, setNick] = useState("");

  const handlePressRegister = () => {
    // console.log("pressed");
    // sendDataToServer({ name: "test", password: "123" });
    registerUser("test1", "123");
  }

  const handlePressLogin = () => {
    // console.log("pressed");
    // sendDataToServer({ name: "test", password: "123" });
    loginUser("test1", "123");
  }

  const onContinue = useCallback(() => {
    if (!nick) {
      Alert.alert("Nick nie może być pusty");
      return;
    }

    // TODO: save nick to async storage and navigate to /games when done

    router.replace("/games");
  }, [nick]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
        automaticallyAdjustKeyboardInsets
        scrollEnabled={false}
      >
        <ThemedText
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
          type="title"
        >
          Student simulator 🍻
        </ThemedText>
        <ThemedText
          style={{
            marginTop: 20,
            padding: 15,
          }}
          type="default"
        >
          Witaj w grze o przetrwanie studenta na kierunku Informatyka! Twoim
          zadaniem jest przejść przez odpowiednie zadania, które czychają na
          studenta, który jedyne o czym marzy to o otrzymaniu dyplomu inżyniera.
          Wykonaj wszystkie taski i żyj w wiecznej chwale!
        </ThemedText>

        <ThemedText
          style={{ marginTop: 100, textAlign: "center" }}
          type="default"
        >
          Podaj swój nick aby zacząć 7 semestrów cierpienia 🥳
        </ThemedText>
        <TextInput
          style={styles.textinput}
          placeholder="Enter your nickname"
          value={nick}
          onChangeText={(text) => setNick(text)}
        />
        <Pressable onPress={onContinue}>
          <ThemedText type="link">Lecimy!</ThemedText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  textinput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 18,
    padding: 10,
    width: 200,
    margin: 10,
  },
});
