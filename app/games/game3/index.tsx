import { Pressable, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Game3() {
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
          Semestr 3 - bazy danych
        </ThemedText>
        <ThemedText
          style={{
            marginTop: 20,
            padding: 15,
          }}
          type="default"
        >
          Znajdujesz się na semestrze trzecim, gdzie do pokonania masz przedmiot
          Bazy danych! W tym roku aby zaliczyć przedmiot należy napisać
          kolokwium zaliczeniowe. Dostaniesz trzy pytania z zakresu SQL - dla
          każdego z nich musiz poprawnie ułożyć zapytanie SQL. Niestety twoja
          wiedza jest zerowa - nic dziwnego, przecież nic się nie uczyłeś cały
          semestr a dopiero 2h przed terminem ogarnąłeś że masz kolosa. Na
          szczęście prowadzący wyszedł z sali, a koledzy na szczęście się uczyli
          - podejdź do nich skanując kod QR i skorzystaj z ich wiedzy!
        </ThemedText>
        <Pressable onPress={() => router.push("/games/game3/q1")}>
          <ThemedText type="link">Czas start!</ThemedText>
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
