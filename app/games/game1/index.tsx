import {
  View,
  Text,
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

export default function Index() {
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
          }}
          type="title"
        >
          Semestr 1 - Unix
        </ThemedText>
        <ThemedText
          style={{
            marginTop: 20,
            padding: 15,
            textAlign: "justify",
          }}
          type="default"
        >
          Zbliża sie termin poprawkowy egzaminu z Unixów, a Ty nie masz pojęcia
          o co chodzi. Twoi koledzy tak samo jak Ty nie przykładali się do
          nauki. Już nie masz szans nauczyć się wszystkiego na pamięć, zostało
          Ci tylko jedno wyjście - włamanie do systemu uczelni i zmiana zdobycie
          pytań na egzamin. Twoim zadaniem jest poruszanoe sie po terminalu
          komendami Unixowymi i odnalezienie pytań na egzamin poprawkowy. Twoi
          znajomi z roku liczą na Ciebie, nie zawiedź ich!
        </ThemedText>
        <Pressable onPress={() => router.push("/games/game1/tutorial")}>
          <ThemedText
            style={{
              marginTop: "40%",
              fontSize: 22,
            }}
            type="link"
          >
            Zaczynamy!
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
