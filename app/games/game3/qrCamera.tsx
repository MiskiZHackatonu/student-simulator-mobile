import React, { useContext, useState } from "react";
import Camera from "@/components/Camera";
import Game3Context from "@/contexts/Game3Context";
import { router } from "expo-router";
import { BarcodeScanningResult } from "expo-camera";

const NewWordsMap = {
  HELP_1: ["FROM", "*", "WYBIERZ", "OD", "Studenci"],
  HELP_2: [
    "INSERT",
    "INTO",
    "Książki",
    "(Id, Tytuł, Autor)",
    "VALUES",
    "(10, 'Mój Przyjaciel Robot', 'Adam Mickiewicz')",
  ],
  HELP_3: [
    "UPDATE",
    "Zamowienia",
    "SET",
    "Cena = 5.50",
    "WHERE",
    "NazwaProduktu = 'Jablko'",
    "AND",
    "IdZamowienia = 20",
  ],
};

export default function QrCamera() {
  const { wordBank, setWordBank } = useContext(Game3Context);

  const [runOnlyOnce, setRunOnlyOnce] = useState(false);

  return (
    <Camera
      onBarcodeScanned={(e: BarcodeScanningResult) => {
        if (!(e.data in NewWordsMap) || runOnlyOnce) return;

        setWordBank?.([...wordBank, ...NewWordsMap[e.data]]);

        router.replace(`/games/game3/${e.data.toLowerCase().replace("_", "")}`);
        setRunOnlyOnce(true);
      }}
    />
  );
}
