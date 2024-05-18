import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import React, { useState, useCallback } from "react";
import { SafeAreaView, StyleSheet, Pressable } from "react-native";
import InfoBottomsheet from "@/components/InfoBottomsheet";
import CircularMenu from "@/components/CircularMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from '@react-navigation/native';
        

type RouteParams = {
  params: {
    nick: string;
  };
};
  
const games = ["Game 1", "Game 2", "Game 3"];

const GamesList = () => {
  const [gameInfo, setGameInfo] = useState("None");
  const route = useRoute<RouteParams>();
  const { nick } = route.params;
    

  const handleGameClick = (gameName: string) => {
    if (games.includes(gameName)) {
      router.push(`/games/${gameName.toLowerCase().replace(" ", "")}`);
    }
  };

  const logOut = useCallback(async () => {
    await AsyncStorage.removeItem("nick");
    router.replace({
      pathname: "/onboarding",
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CircularMenu setGameInfo={setGameInfo} />
      <InfoBottomsheet
        key={gameInfo}
        currentGameInfo={gameInfo}
        setCurrentGameInfo={setGameInfo}
      />
      <ThemedText>Welcome, {nick}!</ThemedText>
      <Pressable onPress={logOut}>
        <ThemedText>Logout</ThemedText>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GamesList;
