import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import React, {useState} from "react";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Button, StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native';

type RouteParams = {
  nick: string;
};

const games = ["Game 1", "Game 2"];

const GamesList = () => {
  const route = useRoute<GamesListRouteProp>();
  const { nick } = route.params;

  const handleGameClick = (gameName: string) => {
    if (games.includes(gameName)) {
      router.push(`/games/${gameName.toLowerCase().replace(" ", "")}`);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText>Statystyki</ThemedText>
      <ThemedText>Welcome, {nick}!</ThemedText>
      <ThemedText>Select a Game:</ThemedText>
      {games.map((game, index) => (
        <Button
          key={index}
          title={game}
          onPress={() => handleGameClick(game)}
        />
      ))}
{/* logout  */}
      <Pressable
        onPress={async () => {
          await AsyncStorage.removeItem("nick");
          router.replace({
            pathname: "/onboarding",
          });
        }}
      >
        <ThemedText>Logout</ThemedText>
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
