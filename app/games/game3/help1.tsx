import { ScrollView } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Help1() {
  return (
    <SafeAreaView>
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
          Pomoc od kolegi nr 1
        </ThemedText>
        <ThemedText
          style={{
            marginTop: 20,
            padding: 15,
          }}
          type="default"
        >
          Elo, podrzuciłem ci parę klauzul które miałem w notatkach. Może ci się
          przydadzą.
          {"\n"}
          {"\n"}
          P.S. Jeszcze znalazłem taką notatkę: żeby zobaczyć wszystkie rekordy w
          tabeli "Książki" wystarczy użyć zapytania: SELECT * FROM Książki;
        </ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}
