import { View, Text, Pressable } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function QRButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        position: "absolute",
        bottom: 30,
        right: 30,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 50,
        zIndex: 100,
      }}
    >
      <AntDesign name="qrcode" size={30} color="black" />
    </Pressable>
  );
}
