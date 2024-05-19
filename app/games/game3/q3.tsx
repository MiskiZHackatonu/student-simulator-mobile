import React from "react";
import ExamQuestion from "@/components/ExamQuestion";
import { router } from "expo-router";
import { Alert } from "react-native";

const answer = [
  "UPDATE",
  "Zamowienia",
  "SET",
  "Cena = 5.50",
  "WHERE",
  "IdZamowienia = 20",
];

export default function Q3() {
  return (
    <ExamQuestion
      onNext={() => {
        Alert.alert("Gratulacje!", "Udało Ci się ukończyć grę!");
        router.replace("/games");
      }}
      question="Pytanie 3: Masz tabelę 'Zamówienia' z kolumnami 'IdZamowienia', 'NazwaProduktu' i 'Cena'. Napisz polecenie SQL, które zaktualizuje cenę produktu o IdZamowienia = 20."
      validSequence={answer}
    />
  );
}
