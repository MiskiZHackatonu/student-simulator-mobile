import { Pressable, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Game2() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
          flexGrow: 1,
        }}
        automaticallyAdjustKeyboardInsets
        scrollEnabled={false}
      >
        <ThemedText
          style={{
            marginTop: 90,
            textAlign: "center",
            color: "black", // Ustawienie koloru tekstu na czarny
          }}
          type="title"
        >
          Semestr 2 - Algorytmy i Struktury Danych
        </ThemedText>
        <ThemedText
          style={{
            marginTop: 20,
            padding: 15,
            textAlign: "justify",
            color: "black", // Ustawienie koloru tekstu na czarny
          }}
          type="default"
        >
          Znajdujesz się na semestrze drugim, gdzie do zdania masz przedmiot
          Algorytmy i Struktury Danych! W tym roku aby zaliczyć przedmiot 
          należy napisać prosty algorytm. Po wejściu zobaczysz mapę AGH oraz studenta,
          który wraca z piątkowych zajęć. Twoim zadaniem jest napisać algorytm,
          dzięki czemu student dojdzie do akademika. Pamiętaj, że zbliża się weekend,
          dlatego aby algorytm był poprawny, student musi po drodzę zebrać wszystkie
          butelki piwa! Niestety twoja wiedza algorytmiczna jest zerowa - nic dziwnego,
          przecież nie ma co się uczyć w trakcie semestru. Na szczęście możesz znaleźć
          porozrzucane kody QR po sali, dzięki czemu skanując je, poznasz 
          bloczkowe procedury, dzięki czemu będziesz w stanie napisać algorytm! 
        </ThemedText>
        <Pressable onPress={() => router.push("/games/game2/gameplay")}>
          <ThemedText
            style={{
              marginTop: "30%",
              fontSize: 22,
              color: "blue", // Ustawienie koloru tekstu na niebieski
            }}
            type="link"
          >
            Czas start!
          </ThemedText>
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
