import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Game1() {
  return (
    <View>
      <Text>game1</Text>
      <Link href="/games/game1/story_page">
        <Text>test</Text>
      </Link>
    </View>
  );
}
