import React from "react";
import ExamQuestion from "@/components/ExamQuestion";
import { router } from "expo-router";

const Q1Answer = ["SELECT", "*", "FROM", "Studenci"];

export default function Q1() {
  return (
    <ExamQuestion
      onNext={() => router.push("/games/game3/q2")}
      question="Pytanie 1: Jakiego polecenia SQL użyjesz, aby wybrać wszystkie rekordy z tabeli o nazwie Studenci?"
      validSequence={Q1Answer}
    />
  );
}
