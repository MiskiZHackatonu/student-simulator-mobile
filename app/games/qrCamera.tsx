import React, { useContext, useState } from "react";
import Camera from "@/components/Camera";
import Game3Context from "@/contexts/Game3Context";
import { router } from "expo-router";
import { BarcodeScanningResult } from "expo-camera";

const NewWordsMap = {
  HELP_1: ["FROM", "*", "WYBIERZ", "OD", "Studenci"],
  HELP_2: [
    "(Id, Tytuł, Autor)",
    "INTO",
    "INSERT",
    "Książki",
    "(10, 'Mój Przyjaciel Robot', 'Adam Mickiewicz')",
    "VALUES",
  ],
  HELP_3: [
    "Cena = 5.50",
    "SET",
    "WHERE",
    "NazwaProduktu = 'Jablko'",
    "Zamowienia",
    "AND",
    "IdZamowienia = 20",
    "UPDATE",
  ],
};

export default function QrCamera() {
  // const { wordBank, setWordBank, foundHelps, setFoundHelps } =
    // useContext(Game3Context);

  // const [runOnlyOnce, setRunOnlyOnce] = useState(false);

  return (
    <Camera
      onBarcodeScanned={async (e: BarcodeScanningResult) => {
        console.log(`got ${e.data}`)
        if (e.data == "game1") {
          router.replace("/games/game1")
        } else if (e.data == "game2") {
          router.replace("/games/game2")
        } else if (e.data == "game3") {
          router.replace("/games/game3")
        }
        else {
          router.replace("/games")
        }
        // setRunOnlyOnce(true);
      }}
    />
  );
}
