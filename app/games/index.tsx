import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import React, {useState} from "react";
import { SafeAreaView,StyleSheet } from "react-native";
import InfoBottomsheet from "@/components/InfoBottomsheet";
import CircularMenu from "@/components/CircularMenu";

const games = ["Game 1", "Game 2", "Game 3"];

const GamesList = () => {
  const [gameInfo, setGameInfo] = useState("None")

  const handleGameClick = (gameName: string) => {
    

    if (games.includes(gameName)) {
      router.push(`/games/${gameName.toLowerCase().replace(" ", "")}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CircularMenu setGameInfo={setGameInfo}/>
      <InfoBottomsheet key={gameInfo} currentGameInfo={gameInfo} setCurrentGameInfo={setGameInfo}/>
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
