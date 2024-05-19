import React, { useContext, useState } from "react";
import Camera from "@/components/Camera";
import { router } from "expo-router";
import { BarcodeScanningResult } from "expo-camera";

export default function QrCamera() {
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
      }}
    />
  );
}
