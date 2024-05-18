import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { registerOrLogin } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OnboardingHome() {
  const [nick, setNick] = useState("");

  useEffect(() => {
    const checkNick = async () => {
      const storedNick = await AsyncStorage.getItem('nick');
      console.log(storedNick);
      if (storedNick) {
        router.replace({
          pathname: "/games",
          params: {
            nick: storedNick,
          },
        });
      }
    };

    checkNick();
  }, []);


  const onContinue = useCallback(async () => {
    if (!nick) {
      Alert.alert("Nick nie może być pusty");
      return;
    }
    
    try {
      await registerOrLogin(nick);
      await AsyncStorage.setItem('nick', nick);
      router.replace({
        pathname: "/games",
        params: {
          nick: nick,
        },
      })
    } catch (error) {
      Alert.alert("Błąd podczas rejestracji");
    }

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
