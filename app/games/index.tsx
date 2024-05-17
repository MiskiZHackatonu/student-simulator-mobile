import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import React from "react";
import { View, Button, StyleSheet } from "react-native";

const games = ["Game 1", "Game 2"];

const GamesList = () => {
  const handleGameClick = (gameName: string) => {
    if (games.includes(gameName)) {
      router.push(`/games/${gameName.toLowerCase().replace(" ", "")}`);
    }
  };

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
