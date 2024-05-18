import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView,StyleSheet } from "react-native";
import InfoBottomsheet from "@/components/InfoBottomSheet";
import CircularMenu from "@/components/CircularMenu";

const games = ["Game 1", "Game 2", "Game 3"];

const GamesList = () => {

  const handleGameClick = (gameName: string) => {
    if (games.includes(gameName)) {
      router.push(`/games/${gameName.toLowerCase().replace(" ", "")}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CircularMenu/>
      <InfoBottomsheet/>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GamesList;
