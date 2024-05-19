import React, { useContext } from "react";
import ExamQuestion from "@/components/ExamQuestion";
import { router } from "expo-router";
import { Alert } from "react-native";
import { completed } from "../index";
import { AllGamesContext } from "../_layout";

const answer = [
  "UPDATE",
  "Zamowienia",
  "SET",
  "Cena = 5.50",
  "WHERE",
  "IdZamowienia = 20",
];

export default function Q3() {
  const { setCompleted } = useContext(AllGamesContext);

  return (
    <ExamQuestion
      onNext={() => {
        Alert.alert("Gratulacje!", "Udało Ci się ukończyć grę!");
        // completed.add("BAZY")
        setCompleted((completed) => [...completed, "BAZY"]);
        console.log("BAZY COMPLETED");
        router.replace("/games");
        while (router.canGoBack()) {
          router.back();
        }
      }}
      question="Pytanie 3: Masz tabelę 'Zamówienia' z kolumnami 'IdZamowienia', 'NazwaProduktu' i 'Cena'. Napisz polecenie SQL, które zaktualizuje cenę produktu o IdZamowienia = 20."
      validSequence={answer}
    />
  );
}
