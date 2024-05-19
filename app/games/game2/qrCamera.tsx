import React, { useContext } from "react";
import Camera from "@/components/Camera";
import { BarcodeScanningResult } from "expo-camera";
import { router } from "expo-router";
import { Game2Context } from "./_layout";

export const movesSet = new Set([]);

// 'Góra', 'Dół', 'Lewo', 'Prawo', 'Skocz', 'Powtórz', 'Koniec powtórzenia'

export default function QrCamera() {
  const { setMoves } = useContext(Game2Context);

  return (
    <Camera
      onBarcodeScanned={async (e: BarcodeScanningResult) => {
        console.log(e.data);
        if (e.data === "MOVE_UP") {
          movesSet.add("Góra");
        } else if (e.data === "MOVE_DOWN") {
          movesSet.add("Dół");
        } else if (e.data === "MOVE_LEFT") {
          movesSet.add("Lewo");
        } else if (e.data === "MOVE_RIGHT") {
          movesSet.add("Prawo");
        } else if (e.data === "JUMP") {
          movesSet.add("Skocz");
        } else if (e.data === "REPEAT") {
          movesSet.add("Powtórz");
        } else if (e.data === "END_OF_REPETITION") {
          movesSet.add("Koniec powtórzenia");
        }
        setMoves(Array.from(movesSet));

        router.back();
      }}
    />
  );
}
