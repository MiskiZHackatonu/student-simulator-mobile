import React from "react";
import ExamQuestion from "@/components/ExamQuestion";
import { router } from "expo-router";

const Q2Answer = ["SELECT", "*", "FROM", "Studenci"];

export default function Q2() {
  return (
    <ExamQuestion
      onNext={() => {
        console.log("Xd");
        router.push("/games/game3/q2");
      }}
      question="Pytanie 2: napisz polecenie SQL, które wstawi nowy rekord do tabeli 'Książki', gdzie Id = 10, Tytuł = 'Mój Przyjaciel Robot', Autor = 'Adam Mickiewicz'."
      validSequence={Q2Answer}
    />
  );
}
