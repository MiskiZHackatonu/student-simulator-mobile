import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Help1() {
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
          Pomoc od kolegi nr 3
        </ThemedText>
        <ThemedText
          style={{
            marginTop: 20,
            padding: 15,
          }}
          type="default"
        >
          UPDATE Zamowienia SET Cena = 5.50 WHERE NazwaProduktu = 'Jablko' AND
          IdZamowienia = 20;
        </ThemedText>
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
