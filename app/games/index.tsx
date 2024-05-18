import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import React from "react";
import { View, Button, StyleSheet, Pressable, Text } from "react-native";
import { registerUser, loginUser } from "./api";


const games = ["Game 1", "Game 2"];

const GamesList = () => {
  const handleGameClick = (gameName: string) => {
    if (games.includes(gameName)) {
      router.push(`/games/${gameName.toLowerCase().replace(" ", "")}`);
    }
  };
  const handlePressRegister = () => {
    // console.log("pressed");
    // sendDataToServer({ name: "test", password: "123" });
    registerUser("test1", "123");
  }

  const handlePressLogin = () => {
    // console.log("pressed");
    // sendDataToServer({ name: "test", password: "123" });
    loginUser("test1", "123");
  }

  return (
    <View style={styles.container}>
      <ThemedText>Statystyki</ThemedText>
      <ThemedText>Select a Game:</ThemedText>
      {games.map((game, index) => (
        <Button
          key={index}
          title={game}
          onPress={() => handleGameClick(game)}
        />
      ))}
      {/* example of sending data to server */}
      <Pressable onPress={handlePressRegister}>
        <Text>register</Text>
      </Pressable>
      <Pressable onPress={handlePressLogin}>
        <Text>login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default GamesList;
