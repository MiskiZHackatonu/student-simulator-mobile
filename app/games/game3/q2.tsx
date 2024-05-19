import React from "react";
import ExamQuestion from "@/components/ExamQuestion";
import { router } from "expo-router";

const Q2Answer = [
  "INSERT",
  "INTO",
  "Książki",
  "(Id, Tytuł, Autor)",
  "VALUES",
  "(10, 'Mój Przyjaciel Robot', 'Adam Mickiewicz')",
];

export default function Q2() {
  return (
    <ExamQuestion
      onNext={() => router.push("/games/game3/q3")}
      question="Pytanie 2: napisz polecenie SQL, które wstawi nowy rekord do tabeli 'Książki', gdzie Id = 10, Tytuł = 'Mój Przyjaciel Robot', Autor = 'Adam Mickiewicz'."
      validSequence={Q2Answer}
    />
  );
}
