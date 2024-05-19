import { View, Text, Button, Pressable} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { router } from "expo-router";

export default function StoryPage() {
  const [answer, setAnswer] = useState("")

  return (
    <View>
      <Text>
        Zbliża sie termin poprawkowy egzaminu z Unixów, a Ty nie masz pojęcia o co chodzi.
        Twoi koledzy tak samo jak Ty nie przykładali się do nauki.
        Już nie masz szans nauczyć się wszystkiego na pamięć, 
        zostało Ci tylko jedno wyjście - włamanie do systemu uczelni i zmiana zdobycie pytań na egzamin.
        Twoim zadaniem jest poruszanoe sie po terminalu komendami Unixowymi i odnalezienie pytań na egzamin poprawkowy.
        Twoi znajomi z roku liczą na Ciebie, nie zawiedź ich!
      </Text>
      <Button title= "PRZEJDŹ DALEJ" onPress={() => router.push("/games/game6/matchmaking_lobby")}/> 
      <Text>Znajdź współgracza</Text>
    </View>
  );
}