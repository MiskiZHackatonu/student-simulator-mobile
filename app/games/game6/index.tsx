import { View, Text,Button } from "react-native";
import { Link,router } from "expo-router";
import React from "react";

export default function Game2() {
  return (
    <View>
      <Text>game1</Text>
      <Button title= "Gracz1" onPress={() => {router.push({ pathname: "/games/game6/game_main", params: { player_id: 1 } });}}/>
        <Button title= "Gracz2" onPress={() => {router.push({ pathname: "/games/game6/game_main", params: { player_id: 2 } });}}/>
    </View>
  );
}
