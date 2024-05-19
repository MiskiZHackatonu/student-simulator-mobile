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
          Semestr 6 - IO
        </ThemedText>
        <ThemedText
          style={{
            marginTop: 20,
            padding: 15,
            textAlign: "justify",
          }}
          type="default"
        >
          Inżynierka pisze sie pełną parą, a twój promotor nagle wymyślił sobie zmiane platformy do zarządzania projektem.
          Software ten zapewnia "Zwiększenie współpracy i synergii w celu optymalizacji procesów oraz osiągnięcia wspólnych celów strategicznych" poprzez ukrywanie części informacji między użytkownikami zmuszając ich do większej kominukacji.{'\n'}
          Toim celem jest przeniesienie ze projektu na nowego kandama z pomocą drugiego gracza.{'\n'}
        </ThemedText>
        <Pressable onPress={() => router.push("/games/game6/matchmaking_lobby")}>
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
