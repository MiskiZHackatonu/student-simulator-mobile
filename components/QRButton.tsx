import { Pressable } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function QRButton({ onPress, style }) {
  return (
    <Pressable onPress={onPress} style={style}>
      <AntDesign name="qrcode" size={30} color="black" />
    </Pressable>
  );
}
