import { ScrollView, StyleSheet } from "react-native";
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
          Pomoc od kolegi nr 2
        </ThemedText>
        <ThemedText
          style={{
            marginTop: 20,
            padding: 15,
          }}
          type="default"
        >
          Hahaha tak myślałem, że nic nie ogarnąłeś na dzisiaj xD. Dobra, ja w
          przeciwieństwie do ciebie zrobiłem notatki i coś tam mam. Akurat byłem
          na zajęciach z tworzenia nowych rekordów w bazie danych i w sumie to
          nie jest trudne, ale jakbyś nie wiedział to zawsze możesz zerknąć na
          moje notatki:
          {"\n"}
          {"\n"}
          Wstawianie do bazy: [INSERT INTO] [tabela] [(kolumny)] [VALUES]
          [(wartości)];
        </ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textinput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 18,
    padding: 10,
    width: 200,
    margin: 10,
  },
});
