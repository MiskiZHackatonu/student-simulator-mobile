import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView, StyleSheet, Pressable } from "react-native";
import InfoBottomsheet from "@/components/InfoBottomsheet";
import CircularMenu from "@/components/CircularMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from '@react-navigation/native';
import { useNavigation, RouteProp } from '@react-navigation/native';

type ParamList = {
  params: {
    nick: string;
  };
};
  
const games = ["Game 1", "Game 2", "Game 3"];

const GamesList = () => {
  const [gameInfo, setGameInfo] = useState("None");
  const route = useRoute<RouteProp<ParamList, 'params'>>();
  const { nick } = route.params;
  const navigation = useNavigation();
    

  const handleGameClick = (gameName: string) => {
    if (games.includes(gameName)) {
      router.push(`/games/${gameName.toLowerCase().replace(" ", "")}`);
    }
  };

  const logOut = useCallback(async () => {
    await AsyncStorage.removeItem("nick");
    router.replace({
      pathname: "/games/game6",
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <ThemedText>Welcome, {nick}!</ThemedText>
      ),
      headerRight: () => (
        <Pressable onPress={logOut}>
          <ThemedText>Logout</ThemedText>
        </Pressable>
      ),
    });
  }, [navigation, logOut, nick]);

  return (
    <SafeAreaView style={styles.container}>
      <CircularMenu setGameInfo={setGameInfo} />
      <InfoBottomsheet
        key={gameInfo}
        currentGameInfo={gameInfo}
        setCurrentGameInfo={setGameInfo}
      />
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
