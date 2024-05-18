import React from "react";
import ExamQuestion from "@/components/ExamQuestion";
import { router } from "expo-router";

export default function Q3() {
  return (
    <ExamQuestion
      onNext={() => {
        console.log("Xd");
        router.push("/games/game3/q2");
      }}
      question="Pytanie 3: Masz tabelę 'Zamówienia' z kolumnami 'IdZamowienia', 'NazwaProduktu' i 'Cena'. Napisz polecenie SQL, które zaktualizuje cenę produktu o nazwie 'Jablko' do 5.50 w zamówieniu o IdZamowienia = 20."
    />
  );
}
